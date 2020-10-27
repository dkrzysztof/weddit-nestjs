import React, { useState } from 'react';

import { Input, Select, Button, Form, Checkbox } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import { updateUserFormRules } from '../utils/usersFormRules';
import { UpdateUserRequest } from 'App/api/admin/requests';
import Role from 'App/types/role';
import { useForm } from 'antd/lib/form/util';
import CheckboxGroup from 'antd/lib/checkbox/Group';

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
	const [form] = Form.useForm();
	const [isAdmin, setIsAdmin] = useState<boolean>(initialValues.isAdmin);

	const handleCheckboxChange = (e) => {
		const { firstName, lastName, email } = form.getFieldsValue();
		form.setFieldsValue({
			firstName,
			lastName,
			email,
			isAdmin: !isAdmin
		});

		setIsAdmin(!isAdmin);
	};
	return (
		<Form form={form} initialValues={initialValues} onFinish={onFinish}>
			<FormItem label='Imię' name='firstName' rules={updateUserFormRules.firstName}>
				<Input />
			</FormItem>

			<FormItem label='Nazwisko' name='lastName' rules={updateUserFormRules.lastName}>
				<Input />
			</FormItem>

			<FormItem label='Email' name='email' rules={updateUserFormRules.email}>
				<Input />
			</FormItem>

			<Form.Item
				label='Uprawnienia administratora'
				name='isAdmin'
				valuePropName='isAdmin'
				rules={updateUserFormRules.isAdmin}
			>
				<Checkbox checked={isAdmin} onChange={handleCheckboxChange} />
			</Form.Item>
			<FormItem>
				<Button block loading={loading} type='primary' htmlType='submit'>
					Zapisz
				</Button>
			</FormItem>
		</Form>
	);
};

export default UpdateUserForm;
