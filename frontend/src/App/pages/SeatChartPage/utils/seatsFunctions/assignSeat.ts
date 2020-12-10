import isPerson from '../isPerson';
import * as go from 'gojs';
import unassignSeat from './unassignSeat';
import findClosestUnoccupiedSeat from './findClosestUnoccupiedSeat';

export default function assignSeat(myDiagram: go.Diagram, node, guest, pt) {
	if (isPerson(node)) {
		node = node.diagram.findNodeForKey(node.data.table);
		if (node === null) return;
	}
	if (guest instanceof go.GraphObject) throw Error('A guest object must not be a GraphObject: ' + guest.toString());
	if (!(pt instanceof go.Point)) pt = node.location;

	unassignSeat(myDiagram, guest);

	var model = node.diagram.model;
	var guests = node.data.guests;
	var closestseatname = findClosestUnoccupiedSeat(node, pt);
	if (closestseatname) {
		model.setDataProperty(guests, closestseatname, guest.key);
		model.setDataProperty(guest, 'table', node.data.key);
		model.setDataProperty(guest, 'seat', parseFloat(closestseatname));
	}

	var plus = guest.plus;
	if (plus) {
		guest.plus = undefined;
		model.updateTargetBindings(guest);
		for (var i = 0; i < plus; i++) {
			var copy = model.copyNodeData(guest);
			copy.table = undefined;
			copy.seat = undefined;
			model.addNodeData(copy);
			assignSeat(myDiagram, node, copy, pt);
		}
	}
}
