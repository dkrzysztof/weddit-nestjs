import { Row, Col } from 'antd';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import PageTitle from 'App/common/components/PageTitle';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import CreateTaskContainer from './containers/CreateTaskContainer';
import GetTasksContainer from './containers/GetTasksContainer';

interface WeddingRouteProps {
	idWedding: string;
}

const TaskListPageContainer: React.FC<RouteComponentProps<WeddingRouteProps>> = ({ match }) => {
	const idWedding = Number.parseInt(match.params.idWedding);

	return (
		<>
			<PageTitle title='Zadania do wykonania' />
			<Row justify='space-around' align='middle'>
				<Col>
					<GoToPreviousPageButton />
				</Col>
				<Col>
					<CreateTaskContainer idWedding={idWedding} />
				</Col>
			</Row>
			<GetTasksContainer idWedding={idWedding} />
		</>
	);
};

export default TaskListPageContainer;
