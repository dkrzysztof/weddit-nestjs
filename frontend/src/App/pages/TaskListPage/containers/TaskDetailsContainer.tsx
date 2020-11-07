import { CheckCircleOutlined, CloseOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import { Row, Col, Card, Modal, Checkbox, Button, Tag, Popconfirm } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { List, useForm } from 'antd/lib/form/Form';
import { UpdateTaskRequest } from 'App/api/taskLists/requests/UpdateTaskRequest';
import { TaskForGetTasksResponse } from 'App/api/taskLists/responses/GetAllTasks';
import LoadingScreen from 'App/common/components/LoadingScreen';
import { RootState } from 'App/state/root.reducer';
import { deleteTask, getTaskDetails, getTasks, updateTask } from 'App/state/tasks/tasks.thunk';
import React, { CSSProperties, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskDetailsForm from '../components/TaskDetailsForm';

interface TaskDetailsContainerProps {
	idWedding: number;
	task: TaskForGetTasksResponse;
}

const completedTaskCardStyle: CSSProperties = {
	border: '1px solid #52c41a',
	borderRadius: '0.25rem',
	backgroundColor: '#52c41a10'
};

const incompletedTaskCardStyle: CSSProperties = {
	border: '1px solid  #d6d6d6',
	borderRadius: '0.25rem'
};

const TaskDetailsContainer: React.FC<TaskDetailsContainerProps> = ({ task, idWedding }) => {
	const [visible, setVisible] = useState<boolean>(false);
	const dispatch = useDispatch();
	const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask);
	const [editView, toggleEditView] = useState(false);
	const [isComplete, setComplete] = useState(task.isComplete);
	const [form] = useForm();

	let t = new Date(task.deadline);

	const handleCancel = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		setVisible(!visible);
	};

	const handleClick = () => {
		dispatch(getTaskDetails(idWedding, task.idTaskList));
		setVisible(true);
	};

	const handleCompleteClick = () => {
		dispatch(
			updateTask(idWedding, task.idTaskList, {
				description: selectedTask.description,
				isComplete: !selectedTask.isComplete
			})
		);
		setVisible(false);
		dispatch(getTasks(idWedding));
	};

	const handleDeleteClick = () => {
		dispatch(deleteTask(idWedding, task.idTaskList));
		setVisible(false);
		dispatch(getTasks(idWedding));
	};

	const title = (
		<Row justify='space-between'>
			<Col span={8}>{task.description}</Col>
			<Col span={16} style={{ textAlign: 'right' }}>
				{t.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
			</Col>
		</Row>
	);

	const handleTaskUpdate = () => {
		form.validateFields().then((values: UpdateTaskRequest) => {
			form.resetFields();

			for (let key in values) {
				if (!values[key]) {
					delete values[key];
				}
			}

			if (values.cost) {
				values.cost = Number.parseFloat(values.cost.toString());
			}

			dispatch(updateTask(idWedding, task.idTaskList, values));
			setVisible(false);
			dispatch(getTasks(idWedding));
		});
	};

	const editModalFooter: ReactElement = (
		<>
			<Button type='default' onClick={() => toggleEditView(false)}>
				Anuluj
			</Button>
			<Button type='primary' onClick={handleTaskUpdate}>
				Akceptuj
			</Button>
		</>
	);

	const viewModalFooter: ReactElement = (
		<>
			<div style={{ float: 'left' }}>
				<Button type='default' onClick={handleCancel}>
					Zamknij
				</Button>
				<Button
					type='default'
					shape='round'
					icon={<EditOutlined />}
					onClick={() => toggleEditView(true)}
				></Button>
				<Popconfirm
					title='Na pewno chcesz usunąć to zadanie?'
					onConfirm={handleDeleteClick}
					okText='Tak'
					cancelText='Anuluj'
				>
					<Button danger type='default' shape='circle' icon={<CloseOutlined />}></Button>
				</Popconfirm>
			</div>
			<Button type='primary' onClick={handleCompleteClick}>
				{task.isComplete ? 'Cofnij wykonanie zadania' : 'Ustaw zadanie jako ukończone'}
			</Button>
		</>
	);

	return (
		<Card
			onClick={handleClick}
			title={title}
			style={task.isComplete ? completedTaskCardStyle : incompletedTaskCardStyle}
		>
			<Row justify='space-between'>
				<Col span={12}>Osoba odpowiedzialna:</Col>
				<Col span={10} style={{ textAlign: 'right' }}>
					{task.dutyHolderFullName}
				</Col>
			</Row>
			<Modal
				width='600px'
				closable={false}
				title={
					<Row justify='space-between'>
						<Col>{`Zadanie: ${task.description}`}</Col>
						<Col style={{ float: 'right' }}>
							{task.isComplete ? (
								<Tag icon={<CheckCircleOutlined />} color='success'>
									Zakończono
								</Tag>
							) : (
								<Tag icon={<SyncOutlined />} color='default'>
									Zadanie w toku
								</Tag>
							)}
						</Col>
					</Row>
				}
				visible={visible}
				footer={editView ? editModalFooter : viewModalFooter}
			>
				<TaskDetailsForm task={selectedTask} editable={editView} form={form} />
			</Modal>
		</Card>
	);
};

export default TaskDetailsContainer;
