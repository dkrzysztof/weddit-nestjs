import * as go from 'gojs';
import * as RotateMultipleTool from 'gojs/extensions/RotateMultipleTool';
import { ReactDiagram } from 'gojs-react';
import { GetGuestsShortCollectionResponse, GuestForGetGuestsResponse } from 'App/api/guests/responses';

export default function init(guests: GetGuestsShortCollectionResponse[]) {
	var $ = go.GraphObject.make;
	let myDiagram = $(go.Diagram, 'myDiagramDiv', {
		layout: $(go.TreeLayout, {
			angle: 90,
			nodeSpacing: 10,
			layerSpacing: 120
		}),
		rotatingTool: new RotateMultipleTool(),
		'undoManager.isEnabled': true
	});

	let myModel = $(go.Model);
	myModel = $(go.TreeModel);
	// let arr = guests.map<go.ObjectData>((x) => ({
	// 	key: `${x.firstName} ${x.lastName}`
	// }));

	let arr = [
		{ key: 1, category: 'TableR3', name: 'Head 1', guests: {}, loc: '143.5 58' },
		{ key: 2, category: 'TableR3', name: 'Head 2', guests: {}, loc: '324.5 58' },
		{ key: 3, category: 'TableR8', name: '3', guests: {}, loc: '121.5 203.5' },
		{ key: 4, category: 'TableC8', name: '4', guests: {}, loc: '364.5 223.5' }
	];
	myModel.nodeDataArray = arr;

	myDiagram.model = myModel;
	myDiagram.nodeTemplate = $(
		go.Node,
		'Horizontal',
		{ background: '#96ff80', padding: 20 },
		$(
			go.TextBlock,
			// TextBlock.text is bound to Node.data.key
			new go.Binding('text', 'key'),
			{
				editable: true
			}
		)
	);
}
