import React from 'react';
import { Form, Input, Select, Button, Checkbox } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { createUserFormRules } from '../utils/usersFormRules';
import { CreateUserRequest } from 'App/api/admin/requests';
import { UserAddOutlined } from '@ant-design/icons';
import PageTitle from 'App/common/components/PageTitle';

interface CreateUserFormProps {
	onFinish: (values: CreateUserRequest) => void;
	initialValues: CreateUserRequest;
	loading: boolean;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ initialValues, loading, onFinish }) => {
	return (
		<>
			<Form initialValues={initialValues} onFinish={onFinish} labelAlign={'right'} labelCol={{ span: 10 }}>
				<FormItem label='Imię' name='firstName' rules={createUserFormRules.firstName}>
					<Input />
				</FormItem>

				<FormItem label='Nazwisko' name='lastName' rules={createUserFormRules.lastName}>
					<Input />
				</FormItem>

				<FormItem label='Email' name='email' rules={createUserFormRules.email}>
					<Input />
				</FormItem>

				<FormItem label='Hasło' name='password' rules={createUserFormRules.password}>
					<Input type='password' />
				</FormItem>

				<FormItem label='Powtórz hasło' name='confirmPassword' rules={createUserFormRules.confirmPassword}>
					<Input type='password' />
				</FormItem>

				<FormItem label='Uprawnienia administratora' name='isAdmin' rules={createUserFormRules.isAdmin}>
					<Checkbox />
				</FormItem>

				<FormItem>
					<Button block loading={loading} type='primary' htmlType='submit'>
						Wyślij
					</Button>
				</FormItem>
			</Form>
		</>
	);
};

export default CreateUserForm;
