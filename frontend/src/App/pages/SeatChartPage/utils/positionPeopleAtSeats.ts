import isPerson from './isPerson';
import positionPersonAtSeat from './positionPersonAtSeat';

export default function positionPeopleAtSeats(myDiagram: go.Diagram, node) {
	if (isPerson(node)) {
		// refer to the person's table instead
		node = node.diagram.findNodeForKey(node.data.table);
		if (node === null) return;
	}
	var guests = node.data.guests;
	var model = node.diagram.model;
	for (var seatname in guests) {
		var guestkey = guests[seatname];
		var guestdata = model.findNodeDataForKey(guestkey);
		positionPersonAtSeat(myDiagram, guestdata);
	}
}
