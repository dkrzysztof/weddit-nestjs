import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router';

import { PageHeader, Alert, Row, Col } from 'antd';
import { Store } from 'antd/lib/form/interface';

import LoginForm from './components/LoginForm';
import './LoginPageContainer.less';
import { LoginRequest } from 'App/api/auth/requests';
import { authenticateUser } from 'App/state/session/session.thunk';
import { RootState } from 'App/state/root.reducer';
import LoadingScreen from 'App/common/components/LoadingScreen';
import StatusType from 'App/types/requestStatus';
import Center from 'App/common/components/Center';

interface LoginPageContainerProps extends RouteChildrenProps {
	name?: string;
}

const LoginPageContainer: React.FC<LoginPageContainerProps> = ({ history }: LoginPageContainerProps) => {
	type FinishFormType = (values: Store) => void;

	const dispatch = useDispatch();
	const [loginError, setLoginError] = useState<string[] | boolean>(false);
	const status = useSelector((state: RootState) => state.session.status.authentication);

	const formInitialValues = {
		email: 'user@user.com',
		password: 'Admin123!'
	};

	const signInHandler: FinishFormType = (values: LoginRequest) => {
		let handleSuccess: () => void = () => {
			history.push('/user');
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
			setLoginError(errors);
		};

		setLoginError(false);

		dispatch(
			authenticateUser(
				{
					password: values.password,
					email: values.email
				},
				handleSuccess,
				handleError
			)
		);
	};

	return (
		<div className='login--container'>
			{status === StatusType.LOADING ? (
				<LoadingScreen container='screen' />
			) : (
				<Center size='small'>
					<br />
					{loginError && (
						<Alert
							message='Error'
							type='error'
							showIcon
							closable
							description={loginError}
							className='w-100'
						/>
					)}
					<PageHeader title={'Zaloguj się'} />
					<LoginForm
						className='login-form'
						name='loginForm'
						size='large'
						onFinish={signInHandler}
						initialValues={formInitialValues}
						autoComplete='off'
					/>
				</Center>
			)}
		</div>
	);
};

export default LoginPageContainer;
