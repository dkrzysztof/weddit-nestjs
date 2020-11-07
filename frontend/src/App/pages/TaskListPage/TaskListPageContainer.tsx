import { Row, Col, Button } from 'antd';
import PageTitle from 'App/common/components/PageTitle';
import React from 'react';
import { useState } from 'react';
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

			<CreateTaskContainer idWedding={idWedding} />
			<GetTasksContainer idWedding={idWedding} />
		</>
	);
};

export default TaskListPageContainer;
