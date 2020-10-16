import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { createUserFormRules } from '../utils/usersFormRules';
import { CreateUserRequest } from 'App/api/admin/requests';

interface CreateUserFormProps {
	onFinish: (values: CreateUserRequest) => void;
	initialValues: CreateUserRequest;
	loading: boolean;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ initialValues, loading, onFinish }) => {
	return (
		<Form initialValues={initialValues} onFinish={onFinish} labelAlign={'right'} labelCol={{ span: 10 }}>
			<FormItem label='Email' name='email' rules={createUserFormRules.email}>
				<Input />
			</FormItem>

			<FormItem label='Hasło' name='password' rules={createUserFormRules.password}>
				<Input type='password' />
			</FormItem>

			<FormItem label='Imię' name='firstName' rules={createUserFormRules.firstName}>
				<Input />
			</FormItem>

			<FormItem label='Nazwisko' name='lastName' rules={createUserFormRules.lastName}>
				<Input />
			</FormItem>

			<FormItem name='roles' label='Rola' rules={createUserFormRules.roleName}>
				<Select mode='multiple' placeholder='Wybierz rolę użytkownika'>
					<Select.Option value='Student'>Student</Select.Option>
					<Select.Option value='Administrator'>Administrator</Select.Option>
				</Select>
			</FormItem>

			<Form.Item name="language" noStyle>
				<Input type="hidden" />
			</Form.Item>

			<FormItem>
				<Button block loading={loading} type='primary' htmlType='submit'>
					Wyślij
				</Button>
			</FormItem>
		</Form>
	);
};

export default CreateUserForm;
