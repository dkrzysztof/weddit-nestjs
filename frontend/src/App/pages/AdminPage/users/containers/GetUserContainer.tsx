import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Col, Descriptions, Divider, Row, Tag } from 'antd';
import LoadingScreen from 'App/common/components/LoadingScreen';
import { getUser, cleanUpUserStatus } from 'App/state/admin/users/users.thunk';
import { RootState } from 'App/state/root.reducer';
import { StatusType } from 'App/types/requestStatus';
import { CheckSquareOutlined } from '@ant-design/icons';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';

interface RouteParams {
	userId: string;
}

interface GetUserContainerProps extends RouteComponentProps<RouteParams> {}

const { LOADING } = StatusType;

const correctAnswerStyle = {
	fontSize: '1.3em',
	color: '#52c41a'
	// marginLeft: '1.5em',
	// marginRight: '0.3em'
};

const GetUserContainer: React.FC<GetUserContainerProps> = ({ match, history }: GetUserContainerProps) => {
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
		<>
			<Row justify='center'>
				<Col span={24} style={{ marginLeft: '2em' }}>
					<GoToPreviousPageButton history={history} />
				</Col>
				<Col span={22}>
					<Divider dashed>
						Profil użytkownika: <strong>{`${user.firstName} ${user.lastName}`}</strong>
					</Divider>
				</Col>
			</Row>
			<Row justify='center' style={{ marginTop: '2em' }}>
				<Col span={22}>
					<Descriptions bordered>
						{user.isAdmin && (
							<Descriptions.Item label='Konto Admina'>
								<CheckSquareOutlined style={correctAnswerStyle} />
							</Descriptions.Item>
						)}
						<Descriptions.Item label='Id'>{user.idUser}</Descriptions.Item>
						<Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
						<Descriptions.Item label='Data założenia konta'>
							{new Date(user.createdAt).toLocaleString('pl-PL')}
						</Descriptions.Item>
					</Descriptions>
				</Col>
			</Row>
		</>
	) : (
		<p>Brak usera</p>
	);
};

export default GetUserContainer;
