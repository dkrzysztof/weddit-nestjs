import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Row, Col, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import CreateUserForm from '../components/CreateUserForm';
import { CreateUserRequest } from 'App/api/admin/requests';
import { cleanUpUserStatus, createUser } from 'App/state/admin/users/users.thunk';
import { RootState } from 'App/state/root.reducer';
import { StatusType } from 'App/types/requestStatus';
import Role from 'App/types/role';
import i18next from 'i18next';

const { LOADING } = StatusType;

export const CreateUserContainer = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	let usersStatus = useSelector((state: RootState) => state.admin.users.status);

	const handleFormSubmit = (values: CreateUserRequest) => {
		dispatch(createUser(values));
	};

	useEffect(() => {
		return () => {
			dispatch(cleanUpUserStatus());
		};
	}, [dispatch]);

	return (
		<React.Fragment>
			<Row className='mb-5'>
				<Col>
					<Button block onClick={() => history.push('/admin/users')} icon={<ArrowLeftOutlined />}>
						Powrót
					</Button>
				</Col>
			</Row>
			<Row justify='center'>
				<Col xl={10} md={12} sm={24}>
					{usersStatus.createUser === StatusType.SUCCESS &&
						notification.success({ message: 'Sukces', description: 'Pomyślnie dodano użytkownika' })}
					<CreateUserForm
						initialValues={{
							email: 'pitula.szymon123@gmail.com',
							password: 'Password123!',
							firstName: 'Szymon',
							lastName: 'Pituła',
							roles: [Role.USER],
							language: i18next.language
						}}
						loading={usersStatus.createUser === LOADING}
						onFinish={handleFormSubmit}
					/>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default CreateUserContainer;