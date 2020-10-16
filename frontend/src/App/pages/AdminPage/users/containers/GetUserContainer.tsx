import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { Descriptions, Tag } from 'antd';
import LoadingScreen from 'App/common/components/LoadingScreen';
import { getUser, cleanUpUserStatus } from 'App/state/admin/users/users.thunk';
import { RootState } from 'App/state/root.reducer';
import { StatusType } from 'App/types/requestStatus';

interface RouteParams {
	userId: string;
}

interface GetUserContainerProps extends RouteComponentProps<RouteParams> {}

const { LOADING } = StatusType;

const GetUserContainer: React.FC<GetUserContainerProps> = ({ match }: GetUserContainerProps) => {
	const userId = match.params.userId;

	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.admin.users.users.find((user) => user.id === userId));
	const usersStatus = useSelector((state: RootState) => state.admin.users.status);
	useEffect(() => {
		if (!user) {
			dispatch(getUser(userId));
		}

		return () => {
			dispatch(cleanUpUserStatus());
		};
	}, [dispatch, userId, user]);
	return usersStatus.getUser === LOADING ? (
		<LoadingScreen container='screen' />
	) : user ? (
		<Descriptions bordered title={`${user.firstName} ${user.lastName}`}>
			<Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
			<Descriptions.Item label='Czy email potwierdzony'>{user.emailConfirmed}</Descriptions.Item>
			<Descriptions.Item label='Id'>{user.id}</Descriptions.Item>
			<Descriptions.Item label='Konto zablokowane?'>{user.lockoutEnabled}</Descriptions.Item>
			<Descriptions.Item label='Role'>
				{user.roles.map((role, index) => (
					<Tag key={index}>{role}</Tag>
				))}
			</Descriptions.Item>
		</Descriptions>
	) : (
		<p>Brak usera</p>
	);
};

export default GetUserContainer;
