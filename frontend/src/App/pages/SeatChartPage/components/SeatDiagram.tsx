// App.js
import React, { useState } from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import highlightSeats from '../utils/highlightSeats';
import assignPeopleToSeats from '../utils/assignPeopleToSeats';
import isPerson from '../utils/isPerson';
import isTable from '../utils/isTable';
import unassignSeat from '../utils/unassignSeat';
import { AnyCnameRecord } from 'dns';
import HorizontalTextRotatingTool from '../utils/HorizontalDraggingTool';
import SpecialDraggingTool from '../utils/SpecialDragginTool';
import { GetGuestsShortCollectionResponse } from 'App/api/guests/responses';
import { Button, Col, Row } from 'antd';
import positionPeopleAtSeats from '../utils/positionPeopleAtSeats';
import { useEffect } from 'react';
import { addSeatChart } from 'App/state/weddings/weddings.thunk';
import { useDispatch } from 'react-redux';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import { SaveOutlined } from '@ant-design/icons';
import menuDiagramInitalNode from '../utils/nodeInitalModels/menuDiagramInitalNode';
import { GuestForSeatChartModel, TableForSeatChartModel } from 'App/types/SeatChartNodeModel';

export var seatDiagram = null;
export var guestDiagram = null;
export var myTables = null;
let tableKey = 1;
let guestKey = 1;
let tableDiagramHasFocus = false;

function initDiagram(onCreationSuccess: () => void, saveModel: (model: string) => void) {
	return () => {
		const $ = go.GraphObject.make;

		seatDiagram = $(go.Diagram, {
			allowDragOut: true, // to myGuests
			allowClipboard: false,
			draggingTool: $(SpecialDraggingTool),
			rotatingTool: $(HorizontalTextRotatingTool),
			// For this sample, automatically show the state of the diagram's model on the page
			ModelChanged: function (e) {
				if (e.isTransactionFinished && document.getElementById('savedModel')) {
					const model = seatDiagram.model.toJson();
					saveModel(model);
					document.getElementById('savedModel').textContent = model;
				}
			},
			'undoManager.isEnabled': true
		});

		function getSeatsRectOneSide(number) {
			switch (number) {
				case 2:
					return [Seat(1, '0.3 0', '0.5 1'), Seat(2, '0.7 0', '0.5 1')];
				case 3:
					return [Seat(1, '0.2 0', '0.5 1'), Seat(2, '0.5 0', '0.5 1'), Seat(3, '0.8 0', '0.5 1')];
				case 4:
					return [
						Seat(1, '0.14 0', '0.5 1'),
						Seat(2, '0.38 0', '0.5 1'),
						Seat(3, '0.62 0', '0.5 1'),
						Seat(4, '0.86 0', '0.5 1')
					];
					break;
				case 5:
					return [
						Seat(1, '0.1 0', '0.5 1'),
						Seat(2, '0.3 0', '0.5 1'),
						Seat(3, '0.5 0', '0.5 1'),
						Seat(4, '0.7 0', '0.5 1'),
						Seat(5, '0.9 0', '0.5 1')
					];
					break;

				default:
					return [Seat(1, '0.2 0', '0.5 1'), Seat(2, '0.5 0', '0.5 1'), Seat(3, '0.8 0', '0.5 1')];
			}
		}

		function getSeatsRectFull(number) {
			switch (number) {
				case 8:
					return [
						Seat(1, '0.2 0', '0.5 1'),
						Seat(2, '0.5 0', '0.5 1'),
						Seat(3, '0.8 0', '0.5 1'),
						Seat(4, '1 0.5', '0 0.5'),
						Seat(5, '0.8 1', '0.5 0'),
						Seat(6, '0.5 1', '0.5 0'),
						Seat(7, '0.2 1', '0.5 0'),
						Seat(8, '0 0.5', '1 0.5')
					];
					break;
				case 10:
					return [
						Seat(1, '0.12 0', '0.5 1'),
						Seat(2, '0.37 0', '0.5 1'),
						Seat(3, '0.63 0', '0.5 1'),
						Seat(4, '0.88 0', '0.5 1'),

						Seat(5, '1 0.5', '0 0.5'),

						Seat(6, '0.12 1', '0.5 0'),
						Seat(7, '0.37 1', '0.5 0'),
						Seat(8, '0.63 1', '0.5 0'),
						Seat(9, '0.88 1', '0.5 0'),

						Seat(10, '0 0.4', '1 0.5')
					];
					break;
				case 12:
					return [
						Seat(1, '0.1 0', '0.5 1'),
						Seat(2, '0.3 0', '0.5 1'),
						Seat(3, '0.5 0', '0.5 1'),
						Seat(4, '0.7 0', '0.5 1'),
						Seat(5, '0.9 0', '0.5 1'),

						Seat(6, '1 0.5', '0 0.5'),

						Seat(7, '0.1 1', '0.5 0'),
						Seat(8, '0.3 1', '0.5 0'),
						Seat(9, '0.5 1', '0.5 0'),
						Seat(10, '0.7 1', '0.5 0'),
						Seat(11, '0.9 1', '0.5 0'),

						Seat(12, '0 0.4', '1 0.5')
					];
					break;
				case 14:
					return [
						Seat(1, '0.10 0', '0.5 1'),
						Seat(2, '0.26 0', '0.5 1'),
						Seat(3, '0.42 0', '0.5 1'),
						Seat(4, '0.58 0', '0.5 1'),
						Seat(5, '0.74 0', '0.5 1'),
						Seat(6, '0.90 0', '0.5 1'),

						Seat(7, '1 0.5', '0 0.5'),

						Seat(8, '0.10 1', '0.5 0'),
						Seat(9, '0.26 1', '0.5 0'),
						Seat(10, '0.42 1', '0.5 0'),
						Seat(11, '0.58 1', '0.5 0'),
						Seat(12, '0.74 1', '0.5 0'),
						Seat(13, '0.90 1', '0.5 0'),

						Seat(14, '0 0.4', '1 0.5')
					];
					break;

				default:
					return [
						Seat(1, '0.2 0', '0.5 1'),
						Seat(2, '0.5 0', '0.5 1'),
						Seat(3, '0.8 0', '0.5 1'),
						Seat(4, '1 0.5', '0 0.5'),
						Seat(5, '0.8 1', '0.5 0'),
						Seat(6, '0.5 1', '0.5 0'),
						Seat(7, '0.2 1', '0.5 0'),
						Seat(8, '0 0.5', '1 0.5')
					];
			}
		}

		function getSeatsCircle(number) {
			switch (number) {
				case 8:
					return [
						Seat(1, '0.50 0', '0.5 1'),
						Seat(2, '0.85 0.15', '0.15 0.85'),
						Seat(3, '1 0.5', '0 0.5'),
						Seat(4, '0.85 0.85', '0.15 0.15'),
						Seat(5, '0.50 1', '0.5 0'),
						Seat(6, '0.15 0.85', '0.85 0.15'),
						Seat(7, '0 0.5', '1 0.5'),
						Seat(8, '0.15 0.15', '0.85 0.85')
					];

				case 9:
					return [
						Seat(1, '0.5 0'),
						Seat(2, '0.82 0.12'),
						Seat(3, '0.99 0.41'),
						Seat(4, '0.93 0.75'),
						Seat(5, '0.67 0.97'),
						Seat(6, '0.33 0.97'),
						Seat(7, '0.07 0.75'),
						Seat(8, '0.01 0.41'),
						Seat(9, '0.18 0.11')
					];

				case 10:
					return [
						Seat(1, '0.5 0'),
						Seat(2, '0.79 0.09'),
						Seat(3, '0.98 0.35'),
						Seat(4, '0.98 0.65'),
						Seat(5, '0.79 0.91'),
						Seat(6, '0.5 1'),
						Seat(7, '0.2 0.9'),
						Seat(8, '0.02 0.65'),
						Seat(9, '0.03 0.34'),
						Seat(10, '0.21 0.09')
					];

				case 12:
					return [
						Seat(1, '0.5 0'),
						Seat(2, '0.75 0.07'),
						Seat(3, '0.93 0.25'),
						Seat(4, '1 0.5'),
						Seat(5, '0.93 0.75'),
						Seat(6, '0.75 0.93'),
						Seat(7, '0.5 1'),
						Seat(8, '0.25 0.93'),
						Seat(9, '0.07 0.75'),
						Seat(10, '0 0.5'),
						Seat(11, '0.07 0.25'),
						Seat(12, '0.25 0.06')
					];

				default:
					return [Seat(1, '0.2 0', '0.5 1'), Seat(2, '0.5 0', '0.5 1'), Seat(3, '0.8 0', '0.5 1')];
			}
		}

		seatDiagram.nodeTemplateMap.add(
			'', // default template, for people
			$(
				go.Node,
				'Auto',
				{ background: 'transparent' }, // in front of all Tables
				// when selected is in foreground layer
				new go.Binding('layerName', 'isSelected', function (s) {
					return s ? 'Foreground' : '';
				}).ofObject(),
				{ locationSpot: go.Spot.Center },
				new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
				new go.Binding('text', 'name'),
				{
					// what to do when a drag-over or a drag-drop occurs on a Node representing a table
					mouseDragEnter: function (e, node, prev) {
						var dragCopy = node.diagram.toolManager.draggingTool.copiedParts; // could be copied from palette
						highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, true);
					},
					mouseDragLeave: function (e, node, next) {
						var dragCopy = node.diagram.toolManager.draggingTool.copiedParts;
						highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, false);
					},
					mouseDrop: function (e, node) {
						assignPeopleToSeats(seatDiagram, node, node.diagram.selection, e.documentPoint);
					}
				},
				$(go.Shape, 'Rectangle', { fill: 'blanchedalmond', stroke: null }),
				$(
					go.Panel,
					'Viewbox',
					{ desiredSize: new go.Size(50, 38) },
					$(
						go.TextBlock,
						{
							margin: 2,
							desiredSize: new go.Size(55, NaN),
							font: '8pt Verdana, sans-serif',
							textAlign: 'center',
							stroke: 'darkblue'
						},
						new go.Binding('text', '', function (data) {
							var s = data.name;
							if (data.plus) s += ' +' + data.plus.toString();
							return s;
						})
					)
				)
			)
		);

		function Seat(number, align, focus?) {
			if (typeof align === 'string') align = go.Spot.parse(align);
			if (!align || !align.isSpot()) align = go.Spot.Right;
			if (typeof focus === 'string') focus = go.Spot.parse(focus);
			if (!focus || !focus.isSpot()) focus = align.opposite();
			return $(
				go.Panel,
				'Spot',
				{ name: number.toString(), alignment: align, alignmentFocus: focus },
				$(
					go.Shape,
					'Circle',
					{
						name: 'SEATSHAPE',
						desiredSize: new go.Size(40, 40),
						fill: 'burlywood',
						stroke: 'white',
						strokeWidth: 2
					},
					new go.Binding('fill')
				),
				$(
					go.TextBlock,
					number.toString(),
					{ font: '10pt Verdana, sans-serif' },
					new go.Binding('angle', 'angle', function (n) {
						return -n;
					})
				)
			);
		}

		function tableStyle() {
			return [
				{ background: 'transparent' },
				{ layerName: 'Background' }, // behind all Persons
				{ locationSpot: go.Spot.Center, locationObjectName: 'TABLESHAPE' },
				new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
				{ rotatable: true },
				new go.Binding('angle').makeTwoWay(),
				{
					// what to do when a drag-over or a drag-drop occurs on a Node representing a table
					mouseDragEnter: function (e, node, prev) {
						var dragCopy = node.diagram.toolManager.draggingTool.copiedParts; // could be copied from palette
						highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, true);
					},
					mouseDragLeave: function (e, node, next) {
						var dragCopy = node.diagram.toolManager.draggingTool.copiedParts;
						highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, false);
					},
					mouseDrop: function (e, node) {
						assignPeopleToSeats(seatDiagram, node, node.diagram.selection, e.documentPoint);
					}
				}
			];
		}
		// various kinds of tables:

		function createTableRectOneSide(numberOfSeats, width, height) {
			return $(
				go.Node,
				'Spot',
				tableStyle(),
				$(
					go.Panel,
					'Spot',
					$(
						go.Shape,
						'Rectangle',
						{
							name: 'TABLESHAPE',
							desiredSize: new go.Size(width, height),
							fill: 'burlywood',
							stroke: null
						},
						new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
						new go.Binding('fill')
					),
					$(
						go.Panel,
						'Vertical',

						$(
							go.TextBlock,
							{ editable: true, font: 'bold 11pt Verdana, sans-serif' },
							new go.Binding('text', 'name').makeTwoWay(),
							new go.Binding('angle', 'angle', function (n) {
								return -n;
							})
						)
					)
				),
				...getSeatsRectOneSide(numberOfSeats)
			);
		}

		function createTableRectCorner(numberOfSeats, width) {
			return $(
				go.Node,
				'Spot',
				tableStyle(),
				$(
					go.Panel,
					'Spot',
					$(
						go.Shape,
						'Square',
						{
							name: 'TABLESHAPE',
							desiredSize: new go.Size(width, width),
							fill: 'burlywood',
							stroke: null
						},
						new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
						new go.Binding('fill')
					),
					$(
						go.Panel,
						'Vertical',

						$(
							go.TextBlock,
							{ editable: true, font: 'bold 11pt Verdana, sans-serif' },
							new go.Binding('text', 'name').makeTwoWay(),
							new go.Binding('angle', 'angle', function (n) {
								return -n;
							})
						)
					)
				),
				Seat(1, '0 0.5'),
				Seat(2, '0.5 0')
			);
		}

		function createTableRectFull(numberOfSeats, width, height) {
			return $(
				go.Node,
				'Spot',
				tableStyle(),
				$(
					go.Panel,
					'Spot',
					$(
						go.Shape,
						'Rectangle',
						{
							name: 'TABLESHAPE',
							desiredSize: new go.Size(width, height),
							fill: 'burlywood',
							stroke: null
						},
						new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
						new go.Binding('fill')
					),

					$(
						go.Panel,
						'Vertical',

						$(
							go.TextBlock,
							{ editable: true, font: 'bold 11pt Verdana, sans-serif' },
							new go.Binding('text', 'name').makeTwoWay(),
							new go.Binding('angle', 'angle', function (n) {
								return -n;
							})
						)
					)
				),
				...getSeatsRectFull(numberOfSeats)
			);
		}

		function createTableCircle(numberOfSeats, width, height) {
			return $(
				go.Node,
				'Spot',
				tableStyle(),
				$(
					go.Panel,
					'Spot',
					$(
						go.Shape,
						'Circle',
						{
							name: 'TABLESHAPE',
							desiredSize: new go.Size(width, height),
							fill: 'burlywood',
							stroke: null
						},
						new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
						new go.Binding('fill')
					),
					$(
						go.Panel,
						'Vertical',

						$(
							go.TextBlock,
							{ editable: true, font: 'bold 11pt Verdana, sans-serif' },
							new go.Binding('text', 'name').makeTwoWay(),
							new go.Binding('angle', 'angle', function (n) {
								return -n;
							})
						)
					)
				),
				...getSeatsCircle(numberOfSeats)
			);
		}

		// RECTANGULAR FULL

		seatDiagram.nodeTemplateMap.add(
			'TableR8', // rectangular with 8 seats
			createTableRectFull(8, 160, 60)
		);

		seatDiagram.nodeTemplateMap.add('TableR10', createTableRectFull(10, 200, 60));

		seatDiagram.nodeTemplateMap.add('TableR12', createTableRectFull(12, 240, 60));

		seatDiagram.nodeTemplateMap.add('TableR14', createTableRectFull(14, 280, 60));

		/// RECTANGULAR ONE SIDE

		seatDiagram.nodeTemplateMap.add('TableRO2', createTableRectOneSide(2, 100, 60));

		seatDiagram.nodeTemplateMap.add('TableRO3', createTableRectOneSide(3, 160, 60));

		seatDiagram.nodeTemplateMap.add('TableRO4', createTableRectOneSide(4, 200, 60));

		seatDiagram.nodeTemplateMap.add('TableRO5', createTableRectOneSide(5, 200, 60));

		/// CIRCULAR

		seatDiagram.nodeTemplateMap.add(
			'TableC8', // circular with 8 seats
			createTableCircle(8, 120, 120)
		);

		seatDiagram.nodeTemplateMap.add(
			'TableC9', // circular with 8 seats
			createTableCircle(9, 120, 120)
		);

		seatDiagram.nodeTemplateMap.add(
			'TableC10', // circular with 8 seats
			createTableCircle(10, 120, 120)
		);

		seatDiagram.nodeTemplateMap.add(
			'TableC12', // circular with 8 seats
			createTableCircle(12, 120, 120)
		);

		seatDiagram.nodeTemplateMap.add(
			'TableRC', // circular with 8 seats
			createTableRectCorner(2, 60)
		);

		// what to do when a drag-drop occurs in the Diagram's background
		seatDiagram.mouseDrop = function (e) {
			e.diagram.selection.each(function (n) {
				if (isPerson(n)) unassignSeat(seatDiagram, n.data);
			});
		};

		// to simulate a "move" from the Palette, the source Node must be deleted.
		seatDiagram.addDiagramListener('ExternalObjectsDropped', function (e) {
			// if any Tables were dropped, don't delete from guestDiagram
			let selectedTable = myTables.selection.first();
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
				seatDiagram.model.addNodeData(myTables.model.copyNodeData(newNodeData));
				// myTables.commandHandler.copySelection();
				// seatDiagram.model.addNodeData(myTables.model.copyNodeData(newnode));
				// e.diagram.toolManager.draggingTool.transactionResult = null;
			}
		});

		// put deleted people back in the guestDiagram diagram
		seatDiagram.addDiagramListener('SelectionDeleted', function (e) {
			// no-op if deleted by guestDiagram' ExternalObjectsDropped listener
			if (seatDiagram.disableSelectionDeleted) return;
			// e.subject is the seatDiagram.selection collection
			e.subject.each(function (n) {
				if (isPerson(n)) {
					guestDiagram.model.addNodeData(guestDiagram.model.copyNodeData(n.data));
				}
			});
		});

		// create some initial tables
		seatDiagram.model = $(go.GraphLinksModel, {
			linkKeyProperty: 'key'
		});

		guestDiagram.nodeTemplateMap = seatDiagram.nodeTemplateMap;

		// specify the contents of the Palette

		guestDiagram.model.undoManager = seatDiagram.model.undoManager; // shared UndoManager!

		seatDiagram.model.makeUniqueKeyFunction = (model: go.Model, data: go.ObjectData) => {
			tableKey = tableKey + 1;
			return tableKey;
		};

		// To simulate a "move" from the Diagram back to the Palette, the source Node must be deleted.
		guestDiagram.addDiagramListener('ExternalObjectsDropped', function (e) {
			// e.subject is the guestDiagram.selection collection
			// if the user dragged a Table to the guestDiagram diagram, cancel the drag
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
			duration,
			animationState
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

function initGuests(onSuccess: () => void) {
	return () => {
		const $ = go.GraphObject.make;
		guestDiagram = $(go.Diagram, {
			layout: $(go.GridLayout, {
				sorting: go.GridLayout.Ascending // sort by Node.text value
			}),
			allowDragOut: true, // to seatDiagram
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

	myTables = $(go.Palette, {
		layout: $(go.GridLayout),
		allowDragOut: true,
		allowMove: false,
		allowDelete: false,
		allowDrop: false,
		maxSelectionCount: 1
	});

	myTables.isReadOnly = true;
	myTables.nodeTemplateMap = seatDiagram.nodeTemplateMap;

	myTables.model.undoManager = seatDiagram.model.undoManager; // shared UndoManager!

	// myTables.model.makeUniqueKeyFunction = (model: go.Model, data: go.ObjectData) => {
	// 	tableKey = tableKey + 1;
	// 	return tableKey;
	// };
	myTables.model.copiesKey = false;

	myTables.addDiagramListener('GainedFocus', function (e) {
		tableDiagramHasFocus = true;
	});

	myTables.addDiagramListener('LostFocus', function (e) {
		setTimeout(() => {
			tableDiagramHasFocus = false;
		}, 100);
	});

	myTables.model = new go.Model([
		{
			key: 1,
			category: 'TableRO2',
			name: 'Jedno-\nstronny 2',
			guests: {}
		},
		{
			key: 2,
			category: 'TableRO3',
			name: 'Jednostronny 3',
			guests: {}
		},
		{
			key: 3,
			category: 'TableRO4',
			name: 'Jednostronny 4',
			guests: {}
		},
		{
			key: 4,
			category: 'TableRO5',
			name: 'Jednostronny 5',
			guests: {}
		},
		{
			key: 5,
			category: 'TableR8',
			name: 'Pełny 8',
			guests: {}
		},
		{
			key: 6,
			category: 'TableR10',
			name: 'Pełny 10',
			guests: {}
		},
		{
			key: 7,
			category: 'TableR12',
			name: 'Pełny 12',
			guests: {}
		},
		{
			key: 8,
			category: 'TableR14',
			name: 'Pełny 14',
			guests: {}
		},
		{
			key: 9,
			category: 'TableC8',
			name: 'Okrągły 8',
			guests: {}
		},
		{
			key: 10,
			category: 'TableC9',
			name: 'Okrągły 9',
			guests: {}
		},
		{
			key: 11,
			category: 'TableC10',
			name: 'Okrągły 10',
			guests: {}
		},
		{
			key: 12,
			category: 'TableC11',
			name: 'Okrągły 11',
			guests: {}
		},
		{
			key: 14,
			category: 'TableC12',
			name: 'Okrągły 12',
			guests: {}
		}
	]);

	return myTables;
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
						Save
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
						initDiagram={initGuests(() => setGuestDiagramCreated(true))}
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
