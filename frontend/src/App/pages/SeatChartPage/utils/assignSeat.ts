import isPerson from './isPerson';
import * as go from 'gojs';
import unassignSeat from './unassignSeat';
import findClosestUnoccupiedSeat from './findClosestUnoccupiedSeat';

export default function assignSeat(myDiagram: go.Diagram, node, guest, pt) {
	if (isPerson(node)) {
		// refer to the person's table instead
		node = node.diagram.findNodeForKey(node.data.table);
		if (node === null) return;
	}
	if (guest instanceof go.GraphObject) throw Error('A guest object must not be a GraphObject: ' + guest.toString());
	if (!(pt instanceof go.Point)) pt = node.location;

	// in case the guest used to be assigned to a different seat, perhaps at a different table
	unassignSeat(myDiagram, guest);

	var model = node.diagram.model;
	var guests = node.data.guests;
	// iterate over all seats in the Node to find one that is not occupied
	var closestseatname = findClosestUnoccupiedSeat(node, pt);
	if (closestseatname) {
		model.setDataProperty(guests, closestseatname, guest.key);
		model.setDataProperty(guest, 'table', node.data.key);
		model.setDataProperty(guest, 'seat', parseFloat(closestseatname));
	}

	var plus = guest.plus;
	if (plus) {
		// represents several people
		// forget the "plus" info, since next we create N copies of the node/data
		guest.plus = undefined;
		model.updateTargetBindings(guest);
		for (var i = 0; i < plus; i++) {
			var copy = model.copyNodeData(guest);
			// don't copy the seat assignment of the first person
			copy.table = undefined;
			copy.seat = undefined;
			model.addNodeData(copy);
			assignSeat(myDiagram, node, copy, pt);
		}
	}
}
