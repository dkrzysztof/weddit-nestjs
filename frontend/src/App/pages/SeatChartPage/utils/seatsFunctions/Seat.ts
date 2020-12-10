import * as go from 'gojs';

const $ = go.GraphObject.make;

function Seat(number, align, focus?) {
	if (typeof align === 'string') align = go.Spot.parse(align);
	if (!align || !align.isSpot()) align = go.Spot.Right;
	if (typeof focus === 'string') focus = go.Spot.parse(focus);
	if (!focus || !focus.isSpot()) focus = align.opposite();
	return $(
		go.Panel,
		'Spot',
		{ name: number.toString(), alignment: align, alignmentFocus: focus },
		$(
			go.Shape,
			'Circle',
			{
				name: 'SEATSHAPE',
				desiredSize: new go.Size(40, 40),
				fill: 'burlywood',
				stroke: 'white',
				strokeWidth: 2
			},
			new go.Binding('fill')
		),
		$(
			go.TextBlock,
			number.toString(),
			{ font: '10pt Verdana, sans-serif' },
			new go.Binding('angle', 'angle', function (n) {
				return -n;
			})
		)
	);
}

export default Seat;
