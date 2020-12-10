import isPerson from '../isPerson';
import isTable from '../isTable';
import * as go from 'gojs';
import assignSeat from './assignSeat';
import { positionPeopleAtSeats } from '../stylingFunctions/repositionElements';

export default function assignPeopleToSeats(myDiagram: go.Diagram, node, coll, pt) {
	if (isPerson(node)) {
		node = node.diagram.findNodeForKey(node.data.table);
		if (node === null) return;
	}

	if (coll.any(isTable)) {
		myDiagram.currentTool.doCancel();
		return;
	}
	coll.each(function (n) {
		assignSeat(myDiagram, node, n.data, pt);
	});
	positionPeopleAtSeats(myDiagram, node);
}
