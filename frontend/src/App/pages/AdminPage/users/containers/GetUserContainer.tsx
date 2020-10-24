import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { Descriptions, Tag } from 'antd';
import LoadingScreen from 'App/common/components/LoadingScreen';
import { getUser, cleanUpUserStatus } from 'App/state/admin/users/users.thunk';
import { RootState } from 'App/state/root.reducer';
import { StatusType } from 'App/types/requestStatus';
import { CheckSquareOutlined } from '@ant-design/icons';

interface RouteParams {
	userId: string;
}

interface GetUserContainerProps extends RouteComponentProps<RouteParams> {}

const { LOADING } = StatusType;

const correctAnswerStyle = {
	fontSize: '1.3em',
	color: '#52c41a',
	marginLeft: '1.5em',
	marginRight: '0.3em'
};

const GetUserContainer: React.FC<GetUserContainerProps> = ({ match }: GetUserContainerProps) => {
	const userId = Number.parseInt(match.params.userId);

	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.admin.users.users.find((user) => user.idUser === userId));
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
			{user.isAdmin && (
				<Descriptions.Item label='Konto Admina'>
					<CheckSquareOutlined style={correctAnswerStyle} />
				</Descriptions.Item>
			)}
			<Descriptions.Item label='Id'>{user.idUser}</Descriptions.Item>
			<Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
			<Descriptions.Item label='Id'>{user.createdAt}</Descriptions.Item>
		</Descriptions>
	) : (
		<p>Brak usera</p>
	);
};

export default GetUserContainer;
