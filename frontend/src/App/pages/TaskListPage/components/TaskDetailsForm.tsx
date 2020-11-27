import React from 'react';
import { Descriptions } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { GetTaskResponse } from 'App/api/taskLists/responses/GetTask';
import LoadingScreen from 'App/common/components/LoadingScreen';
import { dateLocale } from 'App/types/dateLocale';
import UpdateTaskForm from './UpdateTaskForm';

interface TaskDetailsFormProps {
	task: GetTaskResponse;
	editable: boolean;
	form: FormInstance;
}

const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({ form, task, editable }) => {
	if (!task) return <LoadingScreen container='fill' />;

	const ViewModalContent = (
		<>
			<Descriptions layout='vertical' size='middle' column={{ xs: 1, sm: 2, md: 2 }}>
				<Descriptions.Item label='Zadanie' span={2}>
					{task.description ? task.description : <em>-</em>}
				</Descriptions.Item>
				<Descriptions.Item label='Termin'>
					{task.deadline ? task.deadline.toLocaleDateString('pl', dateLocale) : <em>-</em>}
				</Descriptions.Item>
				<Descriptions.Item label='Osoba odpowiedzialna'>
					{task.dutyHolderFullName ? task.dutyHolderFullName : <em>-</em>}
				</Descriptions.Item>
				<Descriptions.Item label='Osoba pierwszego kontaktu'>
					{task.contactPersonFullName ? task.contactPersonFullName : <em>-</em>}
				</Descriptions.Item>
				<Descriptions.Item label='Email osoby pierwszego kontaktu'>
					{task.contactPersonEmail ? task.contactPersonEmail : <em>-</em>}
				</Descriptions.Item>
				<Descriptions.Item label='Telefon osoby pierwszego kontaktu'>
					{task.contactPersonPhone ? task.contactPersonPhone : <em>-</em>}
				</Descriptions.Item>
				<Descriptions.Item label='Koszt'>{task.cost ? `${task.cost} zł` : <em>-</em>}</Descriptions.Item>
				<Descriptions.Item label='Opis' span={2}>
					{task.notes ? (
						<div style={{ padding: '0 1em' }}>
							{task.notes.split(/(?:\r\n|\r|\n)/g).map((x) => (
								<>
									{x}
									<br />
								</>
							))}
						</div>
					) : (
						<em>-</em>
					)}
				</Descriptions.Item>
			</Descriptions>
		</>
	);

	if (editable) {
		return <UpdateTaskForm task={task} form={form} />;
	} else return ViewModalContent;
};

export default TaskDetailsForm;
