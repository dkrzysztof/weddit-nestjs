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
import PageTitle from 'App/common/components/PageTitle';
import { IPageQueryParams } from 'App/types/pagination/pagination';
import { PaginationConfig } from 'antd/lib/pagination/Pagination';

const { LOADING } = StatusType;

const GetUsersContainer = () => {
	const dispatch = useDispatch();

	const users = useSelector((state: RootState) => state.admin.users.users);
	const usersStatus = useSelector((state: RootState) => state.admin.users.status);

	const { pageNumber, pageSize, totalNumberOfItems } = useSelector(
		(state: RootState) => state.admin.users.getUsersParams
	);

	const paginationConfig = {
		pageSize,
		current: pageNumber,
		total: totalNumberOfItems,
		showSizeChanger: true
	};

	useEffect(() => {
		dispatch(
			getUsers({
				pageNumber: pageNumber || defaultPageQueryParams.pageNumber,
				pageSize: pageSize || defaultPageQueryParams.pageSize
			})
		);
	}, [dispatch]);

	const handleTableChange = (pagination: PaginationConfig): any => {
		const { pageNumber: defaultPageNumber, pageSize: defaultPageSize, ...others } = defaultPageQueryParams;
		const pageNumber = pagination.current || defaultPageNumber;
		const pageSize = pagination.pageSize || defaultPageSize;
		dispatch(
			getUsers({
				pageNumber,
				pageSize,
				...others
			})
		);
	};

	return (
		<>
			<PageTitle title='Lista użytkowników' />
			<Row justify='space-around' style={{ marginBottom: '1em' }}>
				<Col span={6}>
					<Link to='/admin/users/create'>
						<Button style={{ width: '100%' }} icon={<PlusOutlined />}>
							Nowy użytkownik
						</Button>
					</Link>
				</Col>
				<Col span={1}></Col>
			</Row>
			<Row className='overflow-hidden'>
				<Col span={24}>
					<Table
						pagination={paginationConfig}
						onChange={handleTableChange}
						loading={usersStatus.getUsers === LOADING}
						columns={renderTableColumns(users, dispatch)}
						dataSource={users}
						rowKey='idUser'
					/>
				</Col>
			</Row>
		</>
	);
};

export default GetUsersContainer;
