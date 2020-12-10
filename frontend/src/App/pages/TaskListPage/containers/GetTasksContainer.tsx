import React, { useEffect } from 'react';
import { List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from 'App/common/components/LoadingScreen';
import { RootState } from 'App/state/root.reducer';
import { getTasks } from 'App/state/tasks/tasks.thunk';
import { isStatusLoading } from 'App/types/requestStatus';
import TaskDetailsContainer from './TaskDetailsContainer';
import '../styles/GetTasksContainer.less';

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

	if (isStatusLoading(tasksStatus) || tasks === null) {
		return <LoadingScreen container='screen' />;
	}

	return (
		<div style={{ padding: '1.5em 1em' }}>
			<List
				grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 5 }}
				dataSource={tasks}
				renderItem={(item, index) => (
					<List.Item>
						<TaskDetailsContainer idWedding={idWedding} key={index} task={item} />
					</List.Item>
				)}
			></List>
		</div>
	);
};

export default GetTasksContainer;
