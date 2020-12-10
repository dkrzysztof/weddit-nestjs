import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { RootState } from 'App/state/root.reducer';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface UserNavbarProps {
	onLogOut: () => void;
	location: any;
}

const UserNavbar: React.FC<UserNavbarProps> = ({ onLogOut, location }) => {
	const w = useSelector((state: RootState) => state.weddings.selectedWedding);

	return (
		<Menu mode='horizontal' defaultSelectedKeys={[location.pathname]} className='menu-padding'>
			<Menu.Item key='/user' style={{ marginRight: '4em' }}>
				<Link to='/user'>
					<HomeOutlined style={{ margin: 'auto' }} />
				</Link>
			</Menu.Item>

			<Menu.Item key='/weddings'>
				<Link to='/weddings'>
					<span style={{ margin: 'auto' }}>Plany Wesel</span>
				</Link>
			</Menu.Item>

			{w && (
				<Menu.Item key={`/weddings/view`}>
					<Link to={`/weddings/${w.idWedding}/view`}>
						<span style={{ margin: 'auto' }}>{w.name}</span>
					</Link>
				</Menu.Item>
			)}

			<Menu.Item style={{ float: 'right' }} onClick={onLogOut}>
				<LogoutOutlined />
				Wyloguj
			</Menu.Item>
		</Menu>
	);
};

export default UserNavbar;
