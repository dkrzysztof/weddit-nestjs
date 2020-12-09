import { Row } from 'antd';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import LoadingScreen from 'App/common/components/LoadingScreen';
import { getGuestsShort } from 'App/state/guests/guests.thunk';
import { RootState } from 'App/state/root.reducer';
import { isStatusLoading, isStatusSuccess } from 'App/types/requestStatus';
import { GuestForSeatChartModel, TableForSeatChartModel } from 'App/types/SeatChartNodeModel';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

// import init from './utils/initDiagram';
import SeatDiagram from './components/SeatDiagram';

interface IdWeddingRouteParam {
	idWedding: string;
}

const SeatChartPageContainer: React.FC<RouteComponentProps<IdWeddingRouteParam>> = ({ match }) => {
	const dispatch = useDispatch();
	const getGuestsShortStatus = useSelector((state: RootState) => state.guests.status.getGuestsShortCollection);
	const wedding = useSelector((state: RootState) => state.weddings.selectedWedding);
	const initialModel = JSON.parse(wedding.seatChart || '{"nodeDataArray": []}') as any;
	const guests = useSelector((state: RootState) => state.guests.guestsShort);
	const idWedding = Number.parseInt(match.params.idWedding);

	useEffect(() => {
		dispatch(getGuestsShort(idWedding));
	}, [dispatch, idWedding]);

	if (!(isStatusSuccess(getGuestsShortStatus) || guests) || isStatusLoading(getGuestsShortStatus)) {
		return <LoadingScreen container='fill' />;
	}

	let guestsFiltered = [];
	let initModel = initialModel.nodeDataArray as TableForSeatChartModel[];
	if (guests) {
		guestsFiltered = initialModel.nodeDataArray as GuestForSeatChartModel[];

		initModel = initModel.map((x) => {
			if (x.hasOwnProperty('guests')) {
				for (let g in x.guests) {
					let key = x.guests[g];
					if (!guestsFiltered.some((f) => f.key === key)) {
						delete x.guests[g];
					}
				}
			}
			return x;
		});
		initialModel.nodeDataArray = initModel;
		guestsFiltered = guests.filter((g) => !guestsFiltered.some((x) => x.idGuest === g.idGuest));
	}

	return (
		<div>
			<SeatDiagram guests={guestsFiltered} idWedding={idWedding} initialModel={initialModel} />
			<div
				style={{
					padding: '1em',
					backgroundColor: 'gainsboro',
					border: '1px solid darkgray',
					borderRadius: '0.25rem',
					fontFamily: 'Consolas, serif',
					maxWidth: '1000px',
					margin: 'auto',
					display: 'none'
				}}
			>
				<pre id='savedModel'></pre>
			</div>
		</div>
	);
};

export default SeatChartPageContainer;
