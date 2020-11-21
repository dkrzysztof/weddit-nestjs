import isPerson from './isPerson';
import isTable from './isTable';

export default function highlightSeats(node, coll, show) {
	if (isPerson(node)) {
		// refer to the person's table instead
		node = node.diagram.findNodeForKey(node.data.table);
		if (node === null) return;
	}
	var it = coll.iterator;
	while (it.next()) {
		var n = it.key;
		// if dragging a Table, don't do any highlighting
		if (isTable(n)) return;
	}
	var guests = node.data.guests;
	for (var sit = node.elements; sit.next(); ) {
		var seat = sit.value;
		if (seat.name) {
			var num = parseFloat(seat.name);
			if (isNaN(num)) continue;
			var seatshape = seat.findObject('SEATSHAPE');
			if (!seatshape) continue;
			if (show) {
				if (guests[seat.name]) {
					seatshape.stroke = 'red';
				} else {
					seatshape.stroke = 'green';
				}
			} else {
				seatshape.stroke = 'white';
			}
		}
	}
}
