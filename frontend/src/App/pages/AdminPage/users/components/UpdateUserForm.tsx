import React from 'react';

import { Input, Select, Button, Form, Checkbox } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import { updateUserFormRules } from '../utils/usersFormRules';
import { UpdateUserRequest } from 'App/api/admin/requests';
import Role from 'App/types/role';

interface UpdateUserFormProps {
	initialValues: {
		email: string;
		firstName: string;
		lastName: string;
		isAdmin: boolean;
	};
	onFinish: (values: UpdateUserRequest) => void;
	loading: boolean;
}
const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ initialValues, loading, onFinish }: UpdateUserFormProps) => {
	return (
		<Form initialValues={initialValues} onFinish={onFinish}>
			<FormItem label='Imię' name='firstName' rules={updateUserFormRules.firstName}>
				<Input />
			</FormItem>

			<FormItem label='Nazwisko' name='lastName' rules={updateUserFormRules.lastName}>
				<Input />
			</FormItem>

			<FormItem label='Uprawnienia administratora' name='isAdmin' rules={updateUserFormRules.isAdmin}>
				<Checkbox />
			</FormItem>
			<FormItem>
				<Button block loading={loading} type='primary' htmlType='submit'>
					Zapisz
				</Button>
			</FormItem>
		</Form>
	);
};

export default UpdateUserForm;
