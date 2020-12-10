import { CheckCircleOutlined, CloseOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import { Row, Col, Card, Modal, Button, Tag, Popconfirm, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { UpdateTaskRequest } from 'App/api/taskLists/requests/UpdateTaskRequest';
import { TaskForGetTasksResponse } from 'App/api/taskLists/responses/GetAllTasks';
import { RootState } from 'App/state/root.reducer';
import { deleteTask, getTaskDetails, getTasks, updateTask } from 'App/state/tasks/tasks.thunk';
import { isStatusLoading } from 'App/types/requestStatus';
import { Moment } from 'moment';
import React, { CSSProperties, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskDetailsForm from '../components/TaskDetailsForm';

interface TaskDetailsContainerProps {
	idWedding: number;
	task: TaskForGetTasksResponse;
}

const completedTaskCardStyle: CSSProperties = {
	border: '2px solid #52c41a',
	borderRadius: '0.25rem'
};

const incompletedTaskCardStyle: CSSProperties = {
	border: '1px solid  #d6d6d6',
	borderRadius: '0.25rem'
};

const TaskDetailsContainer: React.FC<TaskDetailsContainerProps> = ({ task, idWedding }) => {
	const [visible, setVisible] = useState<boolean>(false);
	const dispatch = useDispatch();
	const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask);
	const taskIsUpdating = useSelector((state: RootState) => isStatusLoading(state.tasks.status.updateTask));
	const [editView, toggleEditView] = useState(false);
	const [form] = useForm();

	let t = new Date(task.deadline);

	const handleCancel = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		setVisible(!visible);
	};

	const handleClick = () => {
		dispatch(
			getTaskDetails(idWedding, task.idTaskList, () => {
				setVisible(true);
			})
		);
	};

	const handleCompleteClick = () => {
		dispatch(
			updateTask(
				idWedding,
				task.idTaskList,
				{
					description: selectedTask.description,
					isComplete: !selectedTask.isComplete
				},
				() => {
					setVisible(false);
					dispatch(getTasks(idWedding));
				}
			)
		);
	};

	const handleDeleteClick = () => {
		dispatch(
			deleteTask(idWedding, task.idTaskList, () => {
				setVisible(false);
				dispatch(getTasks(idWedding));
			})
		);
	};

	const title = (
		<div>
			<Typography.Text ellipsis style={{ fontSize: '0.9em', fontWeight: 400 }}>
				{t.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
			</Typography.Text>
			<p style={{ whiteSpace: 'break-spaces', textAlign: 'justify' }}>{task.description}</p>
		</div>
	);

	const handleTaskUpdate = () => {
		form.validateFields().then((values: UpdateTaskRequest) => {
			for (let key in values) {
				if (!values[key]) {
					delete values[key];
				}
			}

			if (values.cost) {
				values.cost = Number.parseFloat(values.cost.toString());
			}

			if (values.deadline) {
				values.deadline = (values.deadline as Moment).startOf('day').add(1, 'hour').toISOString();
			}

			dispatch(
				updateTask(idWedding, task.idTaskList, values, () => {
					dispatch(getTasks(idWedding));
					setVisible(false);
				})
			);
		});
	};

	const editModalFooter: ReactElement = (
		<>
			<Button type='default' onClick={() => toggleEditView(false)}>
				Anuluj
			</Button>
			<Button type='primary' loading={taskIsUpdating} onClick={handleTaskUpdate}>
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
			<Button type='primary' onClick={handleCompleteClick} loading={taskIsUpdating}>
				{task.isComplete ? 'Cofnij wykonanie zadania' : 'Ustaw zadanie jako ukończone'}
			</Button>
		</>
	);

	return (
		<Card
			onClick={handleClick}
			title={title}
			style={task.isComplete ? completedTaskCardStyle : incompletedTaskCardStyle}
			className={task.isComplete ? 'ant-card-green' : '.ant-card-default'}
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
