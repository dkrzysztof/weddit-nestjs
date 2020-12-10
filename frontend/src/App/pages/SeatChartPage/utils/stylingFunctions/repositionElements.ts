import * as go from 'gojs';
import isPerson from '../isPerson';

export function positionPeopleAtSeats(myDiagram: go.Diagram, node) {
	if (isPerson(node)) {
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

export function positionPersonAtSeat(myDiagram: go.Diagram, guest) {
	if (guest instanceof go.GraphObject) throw Error('A guest object must not be a GraphObject: ' + guest.toString());
	if (!guest || !guest.table || !guest.seat) return;
	var diagram = myDiagram;
	var table = diagram.findPartForKey(guest.table);
	var person = diagram.findPartForData(guest);
	if (table && person) {
		var seat = table.findObject(guest.seat.toString());
		var loc = seat.getDocumentPoint(go.Spot.Center);
		var animation = new go.Animation();
		animation.add(person, 'location', person.location, loc);
		animation.start();
	}
}
