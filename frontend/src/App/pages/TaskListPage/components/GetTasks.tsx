import { Card, List } from 'antd';
import { GetTasksResponse } from 'App/api/taskLists/responses/GetAllTasks';
import React from 'react';

interface GetTasksProps {
	dataSource: GetTasksResponse;
}

const GetTasks: React.FC<GetTasksProps> = ({ dataSource }) => {
	return (
		<List
			dataSource={dataSource}
			renderItem={(item) => (
				<List.Item>
					<Card title={item.description}>{item.deadline}</Card>
				</List.Item>
			)}
		></List>
	);
};

export default GetTasks;
