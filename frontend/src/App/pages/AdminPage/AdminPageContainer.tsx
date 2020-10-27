import React, { useState } from 'react';

import { Layout } from 'antd';

import { default as AdminNavbar } from './containers/AdminNavbarContainer';
import { default as AdminPageUsers } from './users/AdminPageUsersContainer';
import { RouteComponentProps } from 'react-router';

const AdminPageContainer: React.FC<RouteComponentProps> = (props) => {
	const [collapsed, setCollapsed] = useState<boolean>(false);

	const handleCollapse = () => setCollapsed(!collapsed);

	const Content = (
		<>
			<AdminPageUsers {...props} />
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
