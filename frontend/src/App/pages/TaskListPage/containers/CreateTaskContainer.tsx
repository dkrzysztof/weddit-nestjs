import { Button, Col, Modal, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { CreateTaskRequest } from 'App/api/taskLists/requests/CreateTaskRequest';
import { RootState } from 'App/state/root.reducer';
import { createTask, getTasks } from 'App/state/tasks/tasks.thunk';
import { isStatusLoading } from 'App/types/requestStatus';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateTaskForm from '../components/CreateTaskForm';

interface CreateTaskContainerProps {
	idWedding: number;
}

const CreateTaskContainer: React.FC<CreateTaskContainerProps> = ({ idWedding }) => {
	const [form] = useForm();
	const dispatch = useDispatch();
	const [visible, setVisible] = useState<boolean>(false);
	const createTaskStatus = useSelector((state: RootState) => state.tasks.status.createTask);

	const handleOk = () => {
		form.validateFields()
			.then((values: CreateTaskRequest) => {
				form.resetFields();

				for (let key in values) {
					if (values[key] === undefined || values[key] === null) {
						delete values[key];
					}
				}

				dispatch(
					createTask(idWedding, values, () => {
						dispatch(getTasks(idWedding));
						setVisible(false);
					})
				);
			})
			.catch(() => {});
	};

	return (
		<>
			<Row>
				<Col>
					<Button onClick={() => setVisible(true)} style={{ width: '100%' }}>
						Stwórz nowe zadanie
					</Button>
				</Col>
			</Row>
			<Modal visible={visible} title='Stwórz nowe zadanie' onOk={handleOk} onCancel={() => setVisible(false)}>
				<CreateTaskForm form={form} loading={isStatusLoading(createTaskStatus)} />
			</Modal>
		</>
	);
};

export default CreateTaskContainer;
