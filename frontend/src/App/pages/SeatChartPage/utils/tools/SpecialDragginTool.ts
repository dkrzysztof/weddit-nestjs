import * as go from 'gojs';
import isPerson from '../isPerson';

export default class SpecialDraggingTool extends go.DraggingTool {
	constructor() {
		super();
		go.DraggingTool.call(this);
		this.isCopyEnabled = false;
	}

	computeEffectiveCollection = function (parts) {
		var map = go.DraggingTool.prototype.computeEffectiveCollection.call(this, parts);
		parts.each(function (table) {
			if (isPerson(table)) return;
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
