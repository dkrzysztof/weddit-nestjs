import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

interface AdminNavbarProps {
	onLogOut: () => void;
	location: any;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ onLogOut, location }) => {
	return (
		<Menu mode='horizontal' defaultSelectedKeys={[location.pathname]} className='menu-padding'>
			<Menu.Item key='/auth'>
				<Link to='/auth'>Strona Domowa Adminów</Link>
			</Menu.Item>
			<Menu.Item key='/user'>
				<Link to='/user'>Strona Domowa</Link>
			</Menu.Item>
			<Menu.Item key='/admin/users'>
				<Link to='/admin/users'>Admin</Link>
			</Menu.Item>
			<Menu.Item style={{ float: 'right' }} onClick={onLogOut}>
				Wyloguj
			</Menu.Item>
		</Menu>
	);
};

export default AdminNavbar;
