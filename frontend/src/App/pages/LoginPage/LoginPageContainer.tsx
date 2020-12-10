import { Alert, PageHeader } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { LoginRequest } from 'App/api/auth/requests';
import Center from 'App/common/components/Center';
import LoadingScreen from 'App/common/components/LoadingScreen';
import { RootState } from 'App/state/root.reducer';
import { authenticateUser } from 'App/state/session/session.thunk';
import { ErrorHandledResponse } from 'App/types/error';
import StatusType from 'App/types/requestStatus';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import LoginForm from './components/LoginForm';
import './LoginPageContainer.less';

interface LoginPageContainerProps extends RouteChildrenProps {
	name?: string;
}

const LoginPageContainer: React.FC<LoginPageContainerProps> = ({ history }: LoginPageContainerProps) => {
	type FinishFormType = (values: Store) => void;

	const dispatch = useDispatch();
	const [loginError, setLoginError] = useState<string[] | string | boolean>(false);
	const status = useSelector((state: RootState) => state.session.status.authentication);

	const formInitialValues = {
		email: 'user@mail.com',
		password: 'Admin123!'
	};

	const signInHandler: FinishFormType = (values: LoginRequest) => {
		let handleSuccess: () => void = () => {
			history.push('/user');
		};

		let handleError: (errorMessages: ErrorHandledResponse) => void = (err: ErrorHandledResponse) => {
			setLoginError(err.description);
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
