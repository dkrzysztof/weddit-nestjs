import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Descriptions, Divider, PageHeader } from 'antd';

import LoadingScreen from 'App/common/components/LoadingScreen';
import { RootState } from 'App/state/root.reducer';
import { StatusType } from 'App/types/requestStatus';
import Center from 'App/common/components/Center';
import AuthUserHomePage from './components/AuthUserHomePage';

interface AuthPageContainerProps extends RouteChildrenProps {
	text?: string;
}

const { LOADING } = StatusType;

const AuthPageContainer: React.FC<AuthPageContainerProps> = ({ history, text }: AuthPageContainerProps) => {
	const dispatch = useDispatch();
	const session = useSelector((state: RootState) => state.session.user);

	const sessionStatus = useSelector((state: RootState) => state.session.status);

	return (
		<>
			<Center size='small'>
				{sessionStatus.devalidateSession === LOADING && <LoadingScreen container='screen' />}
				<PageHeader title='Strona Domowa' />
				<Divider>Profil</Divider>
				<Descriptions title='Dane użytkownika'>
					<Descriptions.Item label='Email'>{session.email}</Descriptions.Item>
					<Descriptions.Item label='Imię'>{session.firstName}</Descriptions.Item>
					<Descriptions.Item label='Nazwisko'>{session.lastName}</Descriptions.Item>
					<Descriptions.Item label='Data założenia konta'>
						{session.createdAt.toLocaleString('pl-PL')}
					</Descriptions.Item>
				</Descriptions>
			</Center>
			<Center size='medium'>
				<Divider>Akcje</Divider>
				<AuthUserHomePage />
			</Center>
		</>
	);
};

export default AuthPageContainer;
