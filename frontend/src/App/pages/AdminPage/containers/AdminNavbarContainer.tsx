import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbarContainer: React.FC<{}> = () => {
	const usersSubMenu = (
		<SubMenu
			key='sub1'
			title={
				<span>
					<UserOutlined />
					<span>Użytkownicy</span>
				</span>
			}
		>
			<Menu.Item key='1'>
				<Link to='/admin/users'>Lista użytkowników</Link>
			</Menu.Item>
			<Menu.Item key='2'>
				<Link to='/admin/users/create'>Dodaj użytkownika</Link>
			</Menu.Item>
		</SubMenu>
	);

	return (
		<Menu className='sidebar' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline'>
			{usersSubMenu}
		</Menu>
	);
};

export default AdminNavbarContainer;
