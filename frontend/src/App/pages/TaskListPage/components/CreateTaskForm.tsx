import { Form, Input, InputNumber } from 'antd';
import { FormInstance, useForm } from 'antd/lib/form/Form';
import { CreateTaskRequest } from 'App/api/taskLists/requests/CreateTaskRequest';
import React from 'react';

interface CreateTaskFormProps {
	form: FormInstance;
	loading: boolean;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ form, loading }) => {
	return (
		<Form
			form={form}
			layout='vertical'
			initialValues={{
				description: 'Zamówić kwiaty',
				deadline: '12.12.2020',
				dutyHolderFullName: 'Adam Nowak',
				cost: 120.0
			}}
		>
			<Form.Item label='Treść zadania' name='description' rules={[{ required: true }]}>
				<Input type='text' disabled={loading} />
			</Form.Item>
			<Form.Item label='Termin' name='deadline' rules={[{ required: true }]}>
				<Input type='date' disabled={loading} min={new Date().toDateString()} />
			</Form.Item>
			<Form.Item label='Osoba odpowiedzialna' name='dutyHolderFullName' rules={[{ required: true }]}>
				<Input type='text' disabled={loading} />
			</Form.Item>
			<Form.Item label='koszt' name='cost' rules={[{ required: true }]}>
				<InputNumber type='number' min={0} step={50} precision={2} disabled={loading} />
			</Form.Item>
			<Form.Item label='Osoba, z którą należy się kontaktować' name='contactPersonFullName'>
				<Input type='text' disabled={loading} />
			</Form.Item>
			<Form.Item label='Telefon do osoby kontaktowej' name='contactPersonPhone'>
				<Input type='text' disabled={loading} />
			</Form.Item>
			<Form.Item label='Email osoby kontaktowej' name='contactPersonEmail'>
				<Input type='text' disabled={loading} />
			</Form.Item>
			<Form.Item label='Notatki' name='notes'>
				<Input.TextArea disabled={loading} />
			</Form.Item>
		</Form>
	);
};

export default CreateTaskForm;
