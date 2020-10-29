import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, notification } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import CreateUserForm from '../components/CreateUserForm';
import { CreateUserRequest } from 'App/api/admin/requests';
import { cleanUpUserStatus, createUser } from 'App/state/admin/users/users.thunk';
import { RootState } from 'App/state/root.reducer';
import { StatusType } from 'App/types/requestStatus';
import PageTitle from 'App/common/components/PageTitle';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';

const { LOADING } = StatusType;

export const CreateUserContainer = () => {
	const dispatch = useDispatch();

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
				<Col span={24} style={{ marginLeft: '2em' }}>
					<GoToPreviousPageButton />
				</Col>
				<Col span={22}>
					<PageTitle title='Stwórz nowego użytkownika' icon={<UserAddOutlined />} />
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
							isAdmin: false
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
