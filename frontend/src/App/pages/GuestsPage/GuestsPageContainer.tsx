import { Button, Tag, Typography } from 'antd';
import agent from 'App/api/agent';
import { GuestForGetGuestsResponse } from 'App/api/guests/responses';
import ConfiguredTable from 'App/common/components/ConfiguredTable';
import LoadingScreen from 'App/common/components/LoadingScreen';
import PageTitle from 'App/common/components/PageTitle';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { getGuests } from 'App/state/guests/guests.thunk';
import { RootState } from 'App/state/root.reducer';
import React, { Dispatch, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import CreateGuestForm from './components/CreateGuestForm';
import CreatePageContainer from './containers/CreateGuestContainer';
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
	}, [dispatch, idWedding, defaultPageQueryParams]);

	if (wedding) {
		return (
			<div>
				<PageTitle title={`Lista Gości na weselu ${wedding.name}`} />
				<CreatePageContainer idWedding={idWedding} />
				<GetGuestsContainer idWedding={idWedding} />
			</div>
		);
	} else {
		return <LoadingScreen container='fill' />;
	}
};

export default GuestsPageContainer;
