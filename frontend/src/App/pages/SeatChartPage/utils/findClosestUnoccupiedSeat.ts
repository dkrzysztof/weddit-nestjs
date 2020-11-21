import isPerson from './isPerson';
import * as go from 'gojs';

export default function findClosestUnoccupiedSeat(node, pt) {
	if (isPerson(node)) {
		// refer to the person's table instead
		node = node.diagram.findNodeForKey(node.data.table);
		if (node === null) return;
	}
	var guests = node.data.guests;
	var closestseatname = null;
	var closestseatdist = Infinity;
	// iterate over all seats in the Node to find one that is not occupied
	for (var sit = node.elements; sit.next(); ) {
		var seat = sit.value;
		if (seat.name) {
			var num = parseFloat(seat.name);
			if (isNaN(num)) continue; // not really a "seat"
			if (guests[seat.name]) continue; // already assigned
			var seatloc = seat.getDocumentPoint(go.Spot.Center);
			var seatdist = seatloc.distanceSquaredPoint(pt);
			if (seatdist < closestseatdist) {
				closestseatdist = seatdist;
				closestseatname = seat.name;
			}
		}
	}
	return closestseatname;
}
