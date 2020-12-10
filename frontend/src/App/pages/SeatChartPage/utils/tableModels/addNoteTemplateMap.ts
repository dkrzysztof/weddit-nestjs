import * as go from 'gojs';
import assignPeopleToSeats from '../seatsFunctions/assignPeopleToSeats';
import highlightSeats from '../stylingFunctions/highlightSeats';
import createTableCircle from './createTables/createTableCircle';
import createTableRectCorner from './createTables/createTableRectCorner';
import createTableRectFull from './createTables/createTableRectFull';
import createTableRectOneSide from './createTables/createTableRectOneSide';

const $ = go.GraphObject.make;

function addNoteTemplatesToSeatDiagram(seatDiagram: go.Diagram) {
	seatDiagram.nodeTemplateMap.add('TableR8', createTableRectFull(seatDiagram, 8, 160, 60));

	seatDiagram.nodeTemplateMap.add('TableR10', createTableRectFull(seatDiagram, 10, 200, 60));

	seatDiagram.nodeTemplateMap.add('TableR12', createTableRectFull(seatDiagram, 12, 240, 60));

	seatDiagram.nodeTemplateMap.add('TableR14', createTableRectFull(seatDiagram, 14, 280, 60));

	seatDiagram.nodeTemplateMap.add('TableRO2', createTableRectOneSide(seatDiagram, 2, 100, 60));

	seatDiagram.nodeTemplateMap.add('TableRO3', createTableRectOneSide(seatDiagram, 3, 160, 60));

	seatDiagram.nodeTemplateMap.add('TableRO4', createTableRectOneSide(seatDiagram, 4, 200, 60));

	seatDiagram.nodeTemplateMap.add('TableRO5', createTableRectOneSide(seatDiagram, 5, 200, 60));

	seatDiagram.nodeTemplateMap.add('TableC8', createTableCircle(seatDiagram, 8, 120, 120));

	seatDiagram.nodeTemplateMap.add('TableC9', createTableCircle(seatDiagram, 9, 120, 120));

	seatDiagram.nodeTemplateMap.add('TableC10', createTableCircle(seatDiagram, 10, 120, 120));

	seatDiagram.nodeTemplateMap.add('TableC12', createTableCircle(seatDiagram, 12, 120, 120));

	seatDiagram.nodeTemplateMap.add('TableRC', createTableRectCorner(seatDiagram, 2, 60));

	seatDiagram.nodeTemplateMap.add(
		'',
		$(
			go.Node,
			'Auto',
			{ background: 'transparent' },
			new go.Binding('layerName', 'isSelected', function (s) {
				return s ? 'Foreground' : '';
			}).ofObject(),
			{ locationSpot: go.Spot.Center },
			new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
			new go.Binding('text', 'name'),
			{
				mouseDragEnter: function (e, node, prev) {
					var dragCopy = node.diagram.toolManager.draggingTool.copiedParts;
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
}

export default addNoteTemplatesToSeatDiagram;
