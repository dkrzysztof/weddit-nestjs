import React from 'react';

import { Button, Col, Form, Input, PageHeader, Row } from 'antd';

import Center from 'App/common/components/Center';
import { RegisterRequest } from 'App/api/auth/requests';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from 'App/state/public/register/register.thunk';
import { RootState } from 'App/state/root.reducer';

import RegisterForm from './components/RegisterForm';
import StatusType from 'App/types/requestStatus';
import LoadingScreen from 'App/common/components/LoadingScreen';

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
	const dispatch = useDispatch();
	const register = useSelector((state: RootState) => state.public.register);

	const handleRegisterFormSubmit = (values: RegisterRequest) => {
		dispatch(registerUser(values));
	};

	return (
		<Center size='small'>
			<PageHeader title={'Zarejestruj się!'} />
			{register.status.registerUser === StatusType.LOADING && <LoadingScreen container='screen' />}
			<RegisterForm onFinish={handleRegisterFormSubmit} />
		</Center>
	);
};

export default RegisterPage;
