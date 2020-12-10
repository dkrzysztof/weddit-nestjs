import * as go from 'gojs';
import Seat from '../../seatsFunctions/Seat';
import tableStyle from '../getTableStyle/tableStyle';

const $ = go.GraphObject.make;

function createTableRectCorner(diagram: go.Diagram, numberOfSeats, width) {
	return $(
		go.Node,
		'Spot',
		tableStyle(diagram),
		$(
			go.Panel,
			'Spot',
			$(
				go.Shape,
				'Square',
				{
					name: 'TABLESHAPE',
					desiredSize: new go.Size(width, width),
					fill: 'burlywood',
					stroke: null
				},
				new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
				new go.Binding('fill')
			),
			$(
				go.Panel,
				'Vertical',

				$(
					go.TextBlock,
					{ editable: true, font: 'bold 11pt Verdana, sans-serif' },
					new go.Binding('text', 'name').makeTwoWay(),
					new go.Binding('angle', 'angle', function (n) {
						return -n;
					})
				)
			)
		),
		Seat(1, '0 0.5'),
		Seat(2, '0.5 0')
	);
}

export default createTableRectCorner;
