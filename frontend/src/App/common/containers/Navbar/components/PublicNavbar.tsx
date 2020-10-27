import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

interface PublicNavbarProps {
	location: any;
}

const PublicNavbar: React.FC<PublicNavbarProps> = ({ location }) => {
	return (
		<Menu mode='horizontal' defaultSelectedKeys={[location.pathname]} className='menu-padding'>
			<Menu.Item key='/'>
				<Link to='/'>HOME</Link>
			</Menu.Item>
			<Menu.Item style={{ float: 'right' }} key='/signin'>
				<Link to='/signin'>Zaloguj</Link>
			</Menu.Item>
			<Menu.Item style={{ float: 'right' }} key='/register'>
				<Link to='/register'>Zarejestruj</Link>
			</Menu.Item>
		</Menu>
	);
};

export default PublicNavbar;
