import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form/Form';
import './LoginForm.less';
import { loginFormRules } from '../utils/loginPageFormRules';

interface LoginFormProps extends FormProps {}

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
	return (
		<Form {...props}>
			<Form.Item name='email' rules={loginFormRules.email}>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
			</Form.Item>
			<Form.Item name='password' rules={loginFormRules.password}>
				<Input
					prefix={<LockOutlined className='site-form-item-icon' />}
					type='password'
					placeholder='Password'
				/>
			</Form.Item>

			<Form.Item>
				<Button className='f-left login-form-button' type='primary' htmlType='submit' size='large'>
					Zaloguj się
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;
