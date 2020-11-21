import * as go from 'gojs';
import positionPeopleAtSeats from './positionPeopleAtSeats';
import { seatDiagram } from '../components/SeatDiagram';

export default class HorizontalTextRotatingTool extends go.RotatingTool {
	constructor() {
		super();
		go.RotatingTool.call(this);
	}

	rotate = function (newangle) {
		go.RotatingTool.prototype.rotate.call(this, newangle);
		var node = this.adornedObject.part;
		positionPeopleAtSeats(seatDiagram, node);
	};
}
