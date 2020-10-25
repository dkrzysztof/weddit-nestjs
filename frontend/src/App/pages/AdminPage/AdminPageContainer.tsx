import React, { useState } from 'react';

import { Layout } from 'antd';

import { default as AdminNavbar } from './containers/AdminNavbarContainer';
import { default as AdminPageUsers } from './users/AdminPageUsersContainer';

const AdminPageContainer: React.FC<{}> = () => {
	const [collapsed, setCollapsed] = useState<boolean>(false);

	const handleCollapse = () => setCollapsed(!collapsed);

	const Content = (
		<>
			<AdminPageUsers />
		</>
	);
	return (
		<div className='d-flex'>
			<Layout.Sider collapsible collapsed={collapsed} onCollapse={handleCollapse} width={256} className='bg-site'>
				<AdminNavbar />
			</Layout.Sider>
			<Layout.Content className='pt-3'>{Content}</Layout.Content>
		</div>
	);
};

export default AdminPageContainer;
