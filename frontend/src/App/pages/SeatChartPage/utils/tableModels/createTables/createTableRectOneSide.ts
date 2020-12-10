import * as go from 'gojs';
import getSeatsRectOneSide from '../getSeats/getSeatsRectOneSide';
import tableStyle from '../getTableStyle/tableStyle';

const $ = go.GraphObject.make;

function createTableRectOneSide(diagram: go.Diagram, numberOfSeats, width, height) {
	return $(
		go.Node,
		'Spot',
		tableStyle(diagram),
		$(
			go.Panel,
			'Spot',
			$(
				go.Shape,
				'Rectangle',
				{
					name: 'TABLESHAPE',
					desiredSize: new go.Size(width, height),
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
		...getSeatsRectOneSide(numberOfSeats)
	);
}

export default createTableRectOneSide;
