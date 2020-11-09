import { Button, Col, Row } from 'antd';
import PageTitle from 'App/common/components/PageTitle';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import CreateBeverageContainer from './containers/CreateBeverageContainer';
import GetBeveragesContainer from './containers/GetBeveragesContainer';

interface WeddingRouteProps {
	idWedding: string;
}

const BeveragePageContainer: React.FC<RouteComponentProps<WeddingRouteProps>> = ({ match }) => {
	const idWedding = Number.parseInt(match.params.idWedding);

	return (
		<>
			<PageTitle title='Lista napojów na weselu' />
			<CreateBeverageContainer idWedding={idWedding} />
			<GetBeveragesContainer idWedding={idWedding} />
		</>
	);
};

export default BeveragePageContainer;
