import React from 'react';

import { Layout } from 'antd';

import { default as AdminNavbar } from './containers/AdminNavbarContainer';
import { default as AdminPageUsers } from './users/AdminPageUsersContainer';

const AdminPageContainer: React.FC<{}> = () => {
	const Content = (
		<>
			<AdminPageUsers />
		</>
	);
	return (
		<div className='d-flex'>
			<Layout.Sider width={256} className='bg-site'>
				<AdminNavbar />
			</Layout.Sider>
			<Layout.Content className='pt-3'>{Content}</Layout.Content>
		</div>
	);
};

export default AdminPageContainer;
