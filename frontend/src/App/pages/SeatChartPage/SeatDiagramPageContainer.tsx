import { Row } from 'antd';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import LoadingScreen from 'App/common/components/LoadingScreen';
import { getGuestsShort } from 'App/state/guests/guests.thunk';
import { RootState } from 'App/state/root.reducer';
import { isStatusLoading, isStatusSuccess } from 'App/types/requestStatus';
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
	const guests = useSelector((state: RootState) => state.guests.guestsShort);
	const idWedding = Number.parseInt(match.params.idWedding);

	useEffect(() => {
		dispatch(getGuestsShort(idWedding));
		console.log(wedding.seatChart);
	}, [dispatch, idWedding]);

	if (!(isStatusSuccess(getGuestsShortStatus) || guests) || isStatusLoading(getGuestsShortStatus)) {
		return <LoadingScreen container='fill' />;
	}

	return (
		<div>
			<SeatDiagram guests={guests} idWedding={idWedding} initialModel={JSON.parse(wedding.seatChart)} />
			<div
				style={{
					padding: '1em',
					backgroundColor: 'gainsboro',
					border: '1px solid darkgray',
					borderRadius: '0.25rem',
					fontFamily: 'Consolas, serif',
					maxWidth: '1000px',
					margin: 'auto'
				}}
			>
				<pre id='savedModel'></pre>
			</div>
		</div>
	);
};

export default SeatChartPageContainer;
