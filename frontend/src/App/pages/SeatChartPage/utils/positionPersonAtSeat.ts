import * as go from 'gojs';

export default function positionPersonAtSeat(myDiagram: go.Diagram, guest) {
	if (guest instanceof go.GraphObject) throw Error('A guest object must not be a GraphObject: ' + guest.toString());
	if (!guest || !guest.table || !guest.seat) return;
	var diagram = myDiagram;
	var table = diagram.findPartForKey(guest.table);
	var person = diagram.findPartForData(guest);
	if (table && person) {
		var seat = table.findObject(guest.seat.toString());
		var loc = seat.getDocumentPoint(go.Spot.Center);
		// animate movement, instead of: person.location = loc;
		var animation = new go.Animation();
		animation.add(person, 'location', person.location, loc);
		animation.start();
	}
}
