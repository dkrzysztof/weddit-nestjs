import * as go from 'gojs';
import isPerson from './isPerson';

export default class SpecialDraggingTool extends go.DraggingTool {
	// isCopyEnabled = false;
	constructor() {
		super();
		go.DraggingTool.call(this);
		this.isCopyEnabled = false; // don't want
	}

	computeEffectiveCollection = function (parts) {
		var map = go.DraggingTool.prototype.computeEffectiveCollection.call(this, parts);
		// for each Node representing a table, also drag all of the people seated at that table
		parts.each(function (table) {
			if (isPerson(table)) return; // ignore persons
			// this is a table Node, find all people Nodes using the same table key
			for (var nit = table.diagram.nodes; nit.next(); ) {
				var n = nit.value;
				if (isPerson(n) && n.data.table === table.data.key) {
					if (!map.has(n)) map.add(n, new go.DraggingInfo(n.location.copy()));
				}
			}
		});
		return map;
	};
}
