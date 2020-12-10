import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Row } from 'antd';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { SaveOutlined } from '@ant-design/icons';

import { addSeatChart } from 'App/state/weddings/weddings.thunk';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import { GuestForSeatChartModel, TableForSeatChartModel } from 'App/types/SeatChartNodeModel';
import { GetGuestsShortCollectionResponse } from 'App/api/guests/responses';
import isPerson from '../utils/isPerson';
import isTable from '../utils/isTable';
import HorizontalTextRotatingTool from '../utils/tools/HorizontalDraggingTool';
import SpecialDraggingTool from '../utils/tools/SpecialDragginTool';
import menuDiagramInitalNode from '../utils/nodeDataArrays/menuDiagramNodeDataArray';
import addNoteTemplatesToSeatDiagram from '../utils/tableModels/addNoteTemplateMap';
import unassignSeat from '../utils/seatsFunctions/unassignSeat';
import { positionPeopleAtSeats } from '../utils/stylingFunctions/repositionElements';
import { menuModelDataArray } from '../utils/menuModels/menuModelDataArray';

export var seatDiagram = null;
export var guestDiagram = null;
export var menuDiagram = null;
let tableKey = 1;
let guestKey = 1;
let tableDiagramHasFocus = false;

function initDiagram(onCreationSuccess: () => void, saveModel: (model: string) => void) {
	return () => {
		const $ = go.GraphObject.make;

		seatDiagram = $(go.Diagram, {
			allowDragOut: true,
			allowClipboard: false,
			draggingTool: $(SpecialDraggingTool),
			rotatingTool: $(HorizontalTextRotatingTool),
			ModelChanged: function (e) {
				if (e.isTransactionFinished && document.getElementById('savedModel')) {
					const model = seatDiagram.model.toJson();
					saveModel(model);
					document.getElementById('savedModel').textContent = model;
				}
			},
			'undoManager.isEnabled': true
		});

		addNoteTemplatesToSeatDiagram(seatDiagram);

		seatDiagram.mouseDrop = function (e) {
			e.diagram.selection.each(function (n) {
				if (isPerson(n)) unassignSeat(seatDiagram, n.data);
			});
		};

		seatDiagram.addDiagramListener('ExternalObjectsDropped', function (e) {
			let selectedTable = menuDiagram.selection.first();
			if (!e.subject.any(isTable)) {
				guestDiagram.commandHandler.deleteSelection();
			}
			if (isTable(selectedTable && selectedTable.data) && tableDiagramHasFocus) {
				let loc = '0 0';
				e.subject.each((e) => {
					if (isTable(e && e.data)) {
						loc = e.data.loc;
						seatDiagram.model.removeNodeData(e.data);
					}
				});
				let newNodeData = { ...selectedTable.data, guests: {}, loc };
				delete newNodeData.key;
				seatDiagram.model.addNodeData(menuDiagram.model.copyNodeData(newNodeData));
			}
		});

		seatDiagram.addDiagramListener('SelectionDeleted', function (e) {
			if (seatDiagram.disableSelectionDeleted) return;

			e.subject.each(function (n) {
				if (isPerson(n)) {
					guestDiagram.model.addNodeData(guestDiagram.model.copyNodeData(n.data));
				}
			});
		});

		seatDiagram.model = $(go.GraphLinksModel, {
			linkKeyProperty: 'key'
		});
		guestDiagram.nodeTemplateMap = seatDiagram.nodeTemplateMap;
		guestDiagram.model.undoManager = seatDiagram.model.undoManager;
		seatDiagram.model.makeUniqueKeyFunction = (model: go.Model, data: go.ObjectData) => {
			tableKey = tableKey + 1;
			return tableKey;
		};

		guestDiagram.addDiagramListener('ExternalObjectsDropped', function (e) {
			if (isPerson(e)) {
				if (e.subject.any(isTable)) {
					seatDiagram.currentTool.doCancel();
					guestDiagram.currentTool.doCancel();
					return;
				}
				seatDiagram.selection.each(function (n) {
					if (isPerson(n)) unassignSeat(seatDiagram, n.data);
				});
				seatDiagram.disableSelectionDeleted = true;
				seatDiagram.commandHandler.deleteSelection();
				seatDiagram.disableSelectionDeleted = false;
				guestDiagram.selection.each(function (n) {
					if (isPerson(n)) unassignSeat(seatDiagram, n.data);
				});
			}
		});

		go.AnimationManager.defineAnimationEffect('location', function (
			obj: any,
			startValue,
			endValue,
			easing,
			currentTime,
			duration
		) {
			obj.location = new go.Point(
				easing(currentTime, startValue.x, endValue.x - startValue.x, duration),
				easing(currentTime, startValue.y, endValue.y - startValue.y, duration)
			);
		});

		onCreationSuccess();

		return seatDiagram;
	};
}

function initGuest(onSuccess: () => void) {
	return () => {
		const $ = go.GraphObject.make;
		guestDiagram = $(go.Diagram, {
			layout: $(go.GridLayout, {
				sorting: go.GridLayout.Ascending
			}),
			allowDragOut: true,
			allowMove: false,
			allowDrop: false
		});

		guestDiagram.model = $(go.GraphLinksModel, {
			linkKeyProperty: 'key'
		});

		onSuccess();

		return guestDiagram;
	};
}

function initMenu() {
	const $ = go.GraphObject.make;

	menuDiagram = $(go.Palette, {
		layout: $(go.GridLayout),
		allowDragOut: true,
		allowMove: false,
		allowDelete: false,
		allowDrop: false,
		maxSelectionCount: 1
	});

	menuDiagram.isReadOnly = true;
	menuDiagram.nodeTemplateMap = seatDiagram.nodeTemplateMap;
	menuDiagram.model.undoManager = seatDiagram.model.undoManager;
	menuDiagram.model.copiesKey = false;

	menuDiagram.addDiagramListener('GainedFocus', function (e) {
		tableDiagramHasFocus = true;
	});

	menuDiagram.addDiagramListener('LostFocus', function (e) {
		setTimeout(() => {
			tableDiagramHasFocus = false;
		}, 100);
	});

	menuDiagram.model = new go.Model(menuModelDataArray);

	return menuDiagram;
}

interface Table {
	key: number;
	category: string;
	name: string;
	guests: any;
	loc: string;
}

interface SeatDiagramProps {
	guests: GetGuestsShortCollectionResponse[];
	idWedding: number;
	initialModel?: {
		nodeDataArray: any[];
	};
}

const SeatDiagram: React.FC<SeatDiagramProps> = ({ guests, idWedding, initialModel }) => {
	const [isGuestDiagramCreated, setGuestDiagramCreated] = useState(false);
	const [isTableDiagramCreated, setTableDiagramCreated] = useState(false);
	const [model, setModel] = useState<string>();
	const dispatch = useDispatch();

	let guestMap = guests.map((x) => ({
		idGuest: x.idGuest,
		name: `${x.firstName} ${x.lastName}`
	}));

	useEffect(() => {
		setTimeout(() => {
			if (seatDiagram && seatDiagram.nodes) {
				seatDiagram.nodes.each(function (n) {
					positionPeopleAtSeats(seatDiagram, n);
				});
			}
		}, 500);
		let tables = initialModel.nodeDataArray as TableForSeatChartModel[];
		let guests = initialModel.nodeDataArray as GuestForSeatChartModel[];
		tables.forEach((x) => {
			if (x.hasOwnProperty('guests')) {
				if (tableKey <= x.key) {
					tableKey = x.key;
				}
			}
		});
		guests.forEach((x) => {
			if (x.hasOwnProperty('table')) {
				if (guestKey <= x.key) {
					guestKey = x.key;
				}
			}
		});
	}, [isGuestDiagramCreated]);

	return (
		<div style={{ margin: '1em' }}>
			<Row justify='space-between' align='middle' style={{ margin: '2em auto 1em', maxWidth: '1200px' }}>
				<Col>
					<GoToPreviousPageButton />
				</Col>
				<Col>
					<Button
						onClick={() => {
							dispatch(addSeatChart(idWedding, { model }));
						}}
					>
						Zapisz
						<SaveOutlined />
					</Button>
				</Col>
			</Row>

			<div className='diagrams-container'>
				{isTableDiagramCreated && (
					<ReactDiagram
						initDiagram={initMenu}
						divClassName='menu-diagram'
						nodeDataArray={menuDiagramInitalNode}
						skipsDiagramUpdate
					/>
				)}
				<div className='d-flex-between'>
					<ReactDiagram
						initDiagram={initGuest(() => setGuestDiagramCreated(true))}
						divClassName='guest-diagram'
						nodeDataArray={guestMap}
						skipsDiagramUpdate
					/>
					{isGuestDiagramCreated && (
						<ReactDiagram
							initDiagram={initDiagram(
								() => setTableDiagramCreated(true),
								(newModel) => setModel(newModel)
							)}
							divClassName='table-diagram'
							nodeDataArray={initialModel && initialModel.nodeDataArray}
							skipsDiagramUpdate
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default SeatDiagram;
