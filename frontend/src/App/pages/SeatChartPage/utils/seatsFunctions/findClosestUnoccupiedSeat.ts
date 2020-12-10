import isPerson from '../isPerson';
import * as go from 'gojs';

export default function findClosestUnoccupiedSeat(node, pt) {
	if (isPerson(node)) {
		node = node.diagram.findNodeForKey(node.data.table);
		if (node === null) return;
	}
	var guests = node.data.guests;
	var closestseatname = null;
	var closestseatdist = Infinity;
	for (var sit = node.elements; sit.next(); ) {
		var seat = sit.value;
		if (seat.name) {
			var num = parseFloat(seat.name);
			if (isNaN(num)) continue;
			if (guests[seat.name]) continue;
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
