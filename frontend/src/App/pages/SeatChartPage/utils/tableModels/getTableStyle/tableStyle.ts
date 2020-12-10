import * as go from 'gojs';
import assignPeopleToSeats from '../../seatsFunctions/assignPeopleToSeats';
import highlightSeats from '../../stylingFunctions/highlightSeats';

function tableStyle(seatDiagram: go.Diagram) {
	return [
		{ background: 'transparent' },
		{ layerName: 'Background' },
		{ locationSpot: go.Spot.Center, locationObjectName: 'TABLESHAPE' },
		new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
		{ rotatable: true },
		new go.Binding('angle').makeTwoWay(),
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
		}
	];
}

export default tableStyle;
