import { Col, Row } from 'antd';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import PageTitle from 'App/common/components/PageTitle';
import React from 'react';
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
			<Row align='middle' justify='space-around'>
				<Col>
					<GoToPreviousPageButton />
				</Col>
				<Col>
					<CreateBeverageContainer idWedding={idWedding} />
				</Col>
			</Row>
			<GetBeveragesContainer idWedding={idWedding} />
		</>
	);
};

export default BeveragePageContainer;
