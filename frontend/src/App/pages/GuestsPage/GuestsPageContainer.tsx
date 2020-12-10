import LoadingScreen from 'App/common/components/LoadingScreen';
import PageTitle from 'App/common/components/PageTitle';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { getGuests } from 'App/state/guests/guests.thunk';
import { RootState } from 'App/state/root.reducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import GuestsPageMenuContainer from './containers/GuestsPageMenuContainer';
import GetGuestsContainer from './containers/GetGuestsContainer';

interface WeddingSubroute {
	idWedding: string;
}

const GuestsPageContainer: React.FC<RouteComponentProps<WeddingSubroute>> = ({ match }) => {
	const idWedding = Number.parseInt(match.params.idWedding);
	const dispatch = useDispatch();
	const wedding = useSelector((state: RootState) => state.weddings.selectedWedding);

	useEffect(() => {
		dispatch(getGuests(idWedding, defaultPageQueryParams));
	}, [dispatch, idWedding]);

	if (wedding) {
		return (
			<div style={{ maxWidth: '1200px', margin: '2em auto' }}>
				<PageTitle title={`Lista Gości na weselu ${wedding.name}`} />
				<GuestsPageMenuContainer idWedding={idWedding} />
				<GetGuestsContainer idWedding={idWedding} />
			</div>
		);
	} else {
		return <LoadingScreen container='fill' />;
	}
};

export default GuestsPageContainer;
