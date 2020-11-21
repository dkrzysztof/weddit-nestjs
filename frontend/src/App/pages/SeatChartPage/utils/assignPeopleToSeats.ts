import isPerson from './isPerson';
import isTable from './isTable';
import * as go from 'gojs';
import assignSeat from './assignSeat';
import positionPeopleAtSeats from './positionPeopleAtSeats';

export default function assignPeopleToSeats(myDiagram: go.Diagram, node, coll, pt) {
	if (isPerson(node)) {
		// refer to the person's table instead
		node = node.diagram.findNodeForKey(node.data.table);
		if (node === null) return;
	}

	if (coll.any(isTable)) {
		// if dragging a Table, don't allow it to be dropped onto another table
		myDiagram.currentTool.doCancel();
		return;
	}
	// OK -- all Nodes are people, call assignSeat on each person data
	coll.each(function (n) {
		assignSeat(myDiagram, node, n.data, pt);
	});
	positionPeopleAtSeats(myDiagram, node);
}
