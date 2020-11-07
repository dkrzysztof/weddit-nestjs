import { CheckCircleOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Col, Descriptions, Input, Row, Tag, Typography, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UpdateTaskRequest } from 'App/api/taskLists/requests/UpdateTaskRequest';
import moment from 'moment';
import { GetTaskResponse } from 'App/api/taskLists/responses/GetTask';
import LoadingScreen from 'App/common/components/LoadingScreen';
import { dateLocale } from 'App/types/dateLocale';
import React from 'react';

interface TaskDetailsFormProps {
	task: GetTaskResponse;
	editable: boolean;
	form: FormInstance;
}

const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({ form, task, editable }) => {
	if (!task) return <LoadingScreen container='fill' />;

	const EditModalContent = (
		<Form layout='vertical' form={form} initialValues={{ deadline: task.deadline, ...task }}>
			<Form.Item
				label='Zadanie'
				name='description'
				rules={[{ required: true, message: 'Należy podać nazwę zadania!' }]}
			>
				<Input />
			</Form.Item>
			<Row gutter={8} justify='space-between'>
				<Col span={11}>
					<Form.Item
						label='Termin'
						name='deadline'
						rules={[{ required: true, message: 'Należy podać termin zadania!' }]}
					>
						<Input type='date' />
					</Form.Item>
				</Col>
				<Col span={11}>
					<Form.Item
						label='Osoba odpowiedzialna'
						name='dutyHolderFullName'
						rules={[{ required: true, message: 'Należy podać osobę odpowiedzialną za zadanie!' }]}
					>
						<Input />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={8} justify='space-between'>
				<Col span={11}>
					<Form.Item label='Osoba pierwszego kontaktu' name='contactPersonFullName'>
						<Input />
					</Form.Item>
				</Col>
				<Col span={11}>
					<Form.Item label='Email osoby pierwszego kontaktu' name='contactPersonEmail'>
						<Input />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={8} justify='space-between'>
				<Col span={11}>
					<Form.Item label='Telefon osoby pierwszego kontaktu' name='contactPersonPhone'>
						<Input />
					</Form.Item>
				</Col>
				<Col span={11}>
					<Form.Item label='Koszt' name='cost'>
						<Input />
					</Form.Item>
				</Col>
			</Row>
			<Form.Item label='Opis' name='notes'>
				<Input.TextArea />
			</Form.Item>
		</Form>
	);

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
				<Descriptions.Item label='Koszt'>{task.cost ? task.cost : <em>-</em>}</Descriptions.Item>
				<Descriptions.Item label='Opis' span={2}>
					{task.notes ? task.notes : <em>-</em>}
				</Descriptions.Item>
			</Descriptions>
		</>
	);

	if (editable) return EditModalContent;
	else return ViewModalContent;
};

export default TaskDetailsForm;
