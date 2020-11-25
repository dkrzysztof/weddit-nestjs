import { Form, Input, Row, Col, Button } from 'antd';
import { RegisterRequest } from 'App/api/auth/requests';
import React from 'react';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 13 }
	}
};

const initialValues: RegisterRequest = {
	firstName: 'Jan',
	lastName: 'Kowalski',
	email: 'user@email.com',
	password: 'Admin123!',
	confirmPassword: 'Admin123!'
};

interface RegiserFormProps {
	onFinish: (values: RegisterRequest) => void;
}

const RegiserForm: React.FC<RegiserFormProps> = ({ onFinish }) => {
	return (
		<Form {...formItemLayout} onFinish={onFinish} initialValues={initialValues}>
			<Form.Item name='firstName' label='Imię' rules={[{ required: true }]}>
				<Input></Input>
			</Form.Item>
			<Form.Item name='lastName' label='Nazwisko' rules={[{ required: true }]}>
				<Input></Input>
			</Form.Item>
			<Form.Item name='email' label='E-mail' rules={[{ required: true, type: 'email' }]}>
				<Input></Input>
			</Form.Item>
			<Form.Item
				name='password'
				label='Hasło'
				rules={[
					{
						required: true,
						message: 'Hasło nie może być puste!'
					},
					{
						min: 6,
						message: 'Hasło powinno mieć przynajmniej 6 znaków'
					}
				]}
				hasFeedback
			>
				<Input.Password></Input.Password>
			</Form.Item>
			<Form.Item
				name='confirmPassword'
				label='Powtórz hasło'
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Należy potwierdzić wprowadzone hasło!',
						min: 6
					},
					({ getFieldValue }) => ({
						validator(rule, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject('Wprowadzone hasła nie są takie same!');
						}
					})
				]}
			>
				<Input.Password></Input.Password>
			</Form.Item>
			<br />
			<Row align='middle' justify='center'>
				<Col xs={22} sm={16} md={18} xl={16} xxl={8}>
					<Button
						className='f-left login-form-button'
						type='primary'
						style={{ width: '100%' }}
						htmlType='submit'
						size='large'
					>
						Zarejestruj!
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default RegiserForm;
