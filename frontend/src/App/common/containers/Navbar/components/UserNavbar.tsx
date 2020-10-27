import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

interface UserNavbarProps {
	onLogOut: () => void;
	location: any;
}

const UserNavbar: React.FC<UserNavbarProps> = ({ onLogOut, location }) => {
	return (
		<Menu mode='horizontal' defaultSelectedKeys={[location.pathname]} className='menu-padding'>
			<Menu.Item key='/user' style={{ marginRight: '4em' }}>
				<Link to='/user'>
					<HomeOutlined style={{ margin: 'auto' }} />
				</Link>
			</Menu.Item>

			<Menu.Item key='/user/weddings'>
				<Link to='/user/weddings'>
					<span style={{ margin: 'auto' }}>Plany Wesel</span>
				</Link>
			</Menu.Item>

			<Menu.Item style={{ float: 'right' }} onClick={onLogOut}>
				<LogoutOutlined />
				Wyloguj
			</Menu.Item>
		</Menu>
	);
};

export default UserNavbar;
