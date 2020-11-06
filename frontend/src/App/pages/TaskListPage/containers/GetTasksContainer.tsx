import LoadingScreen from 'App/common/components/LoadingScreen';
import { RootState } from 'App/state/root.reducer';
import { getTasks } from 'App/state/tasks/tasks.thunk';
import { isStatusLoading } from 'App/types/requestStatus';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GetTasks from '../components/GetTasks';

export interface GetTasksContainer {
	idWedding: number;
}

const GetTasksContainer: React.FC<GetTasksContainer> = ({ idWedding }) => {
	const dispatch = useDispatch();
	const tasks = useSelector((state: RootState) => state.tasks.tasks);
	const tasksStatus = useSelector((state: RootState) => state.tasks.status.getTasks);

	useEffect(() => {
		dispatch(getTasks(idWedding));
	}, [dispatch, idWedding]);

	if (isStatusLoading(tasksStatus) || !tasks) {
		return <LoadingScreen container='screen' />;
	}

	return (
		<>
			<GetTasks dataSource={tasks} />
		</>
	);
};

export default GetTasksContainer;
