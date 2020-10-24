import React, { useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Col, notification, PageHeader, Result, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import LoadingScreen from 'App/common/components/LoadingScreen';
import { UpdateUserRequest } from 'App/api/admin/requests';

import UpdateUserForm from '../components/UpdateUserForm';
import { getUser, cleanUpUserStatus, updateUser } from 'App/state/admin/users/users.thunk';
import { RootState } from 'App/state/root.reducer';
import { StatusType } from 'App/types/requestStatus';

interface RouteParams {
	userId: string;
}

interface UpdateUserContainerProps extends RouteComponentProps<RouteParams> {}

const { LOADING, SUCCESS } = StatusType;

const UpdateUserContainer: React.FC<UpdateUserContainerProps> = ({ match }) => {
	const userId = Number.parseInt(match.params.userId);
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.admin.users.selectedUser);

	const usersStatus = useSelector((state: RootState) => state.admin.users.status);
	useEffect(() => {
		if (!user) {
			dispatch(getUser(userId));
		}
	}, [dispatch, user, userId]);

	useEffect(() => {
		return () => {
			dispatch(cleanUpUserStatus());
		};
	}, [dispatch]);

	const handleFormSubmit = (values: UpdateUserRequest) => {
		if (user) {
			dispatch(updateUser(user.idUser, values));
		}
	};

	const handleBackHomeButton = () => history.push('/');

	return usersStatus.getUser === LOADING ? (
		<LoadingScreen container='fill' />
	) : user ? (
		<React.Fragment>
			<Button onClick={() => history.push('/admin/users')} icon={<ArrowLeftOutlined />}>
				Powrót
			</Button>
			<Row align='middle' justify='center'>
				<Col xs={22} md={14} xl={10} xxl={8}>
					{usersStatus.updateUser === SUCCESS &&
						notification.success({
							message: 'Sukces',
							description: 'Pomyślnie zaktualizowano dane użytkownika'
						})}
					<PageHeader title={'Edycja danych użytkownika'} />
					<UpdateUserForm
						initialValues={{
							email: user.email,
							firstName: user.firstName,
							lastName: user.lastName,
							isAdmin: user.isAdmin
						}}
						onFinish={handleFormSubmit}
						loading={usersStatus.updateUser === LOADING}
					/>
				</Col>
			</Row>
		</React.Fragment>
	) : (
		<Result
			status='404'
			title='Wystąpił błąd'
			subTitle='Nie znaleziono użytkownika w bazie danych.'
			extra={
				<Button type='primary' onClick={handleBackHomeButton}>
					Powrót na stronę główną
				</Button>
			}
		/>
	);
};

export default UpdateUserContainer;
