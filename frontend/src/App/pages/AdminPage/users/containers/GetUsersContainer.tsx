import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col, Button, Table, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { renderTableColumns } from '../utils/UsersTable';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { getUsers } from 'App/state/admin/users/users.thunk';
import { RootState } from 'App/state/root.reducer';
import { StatusType } from 'App/types/requestStatus';

const { LOADING } = StatusType;

const GetUsersContainer = () => {
	const dispatch = useDispatch();

	const users = useSelector((state: RootState) => state.admin.users.users);
	const usersStatus = useSelector((state: RootState) => state.admin.users.status);

	const { pageNumber, pageSize, totalNumberOfItems } = useSelector(
		(state: RootState) => state.admin.users.getUsersParams
	);

	useEffect(() => {
		dispatch(getUsers(defaultPageQueryParams));
	}, [dispatch]);

	const handleTableChange = (pagination: any): any => {
		dispatch(
			getUsers({
				pageNumber: pagination.current || 1,
				pageSize: pagination.pageSize || 10,
				query: '',
				...defaultPageQueryParams
			})
		);
	};

	const paginationConfig = {
		pageSize,
		current: pageNumber,
		total: totalNumberOfItems,
		showSizeChanger: true
	};

	return (
		<>
			<Row>
				<Col span={24}>
					<Link to='/admin/users/create'>
						<Button icon={<PlusOutlined />}>Nowy użytkownik</Button>
					</Link>
				</Col>
			</Row>
			<Row className='overflow-hidden'>
				<Col span={24}>
					<Input
						allowClear
						onChange={(val) =>
							dispatch(
								getUsers({
									...defaultPageQueryParams,
									query: val.currentTarget.value
								})
							)
						}
					/>
					<Table
						pagination={paginationConfig}
						onChange={handleTableChange}
						loading={usersStatus.getUsers === LOADING}
						columns={renderTableColumns(users, dispatch)}
						dataSource={users}
						rowKey='id'
					/>
				</Col>
			</Row>
		</>
	);
};

export default GetUsersContainer;
