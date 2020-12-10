import * as go from 'gojs';
export default function unassignSeat(myDiagram: go.Diagram, guest) {
	if (guest instanceof go.GraphObject) throw Error('A guest object must not be a GraphObject: ' + guest.toString());
	var model = myDiagram.model;
	if (guest.table) {
		var table = model.findNodeDataForKey(guest.table);
		if (table) {
			var guests = table.guests;
			if (guests) model.setDataProperty(guests, guest.seat.toString(), undefined);
		}
	}
	model.setDataProperty(guest, 'table', undefined);
	model.setDataProperty(guest, 'seat', undefined);
}
