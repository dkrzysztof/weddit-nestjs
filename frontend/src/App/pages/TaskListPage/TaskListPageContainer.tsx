import React from 'react';
import { RouteComponentProps } from 'react-router';
import GetTasksContainer from './containers/GetTasksContainer';

interface WeddingRouteProps {
	idWedding: string;
}

const TaskListPageContainer: React.FC<RouteComponentProps<WeddingRouteProps>> = ({ match }) => {
	const idWedding = Number.parseInt(match.params.idWedding);

	return (
		<>
			<GetTasksContainer idWedding={idWedding} />
		</>
	);
};

export default TaskListPageContainer;
