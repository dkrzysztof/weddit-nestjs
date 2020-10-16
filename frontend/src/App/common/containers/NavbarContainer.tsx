import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'App/state/root.reducer';

import './NavbarContainer.less';

const NavbarContainer: React.FC<{}> = () => {
	const userIsLoggedIn = useSelector<RootState>(
		(state: RootState) => !!(state.session.info && state.session.info.token)
	);

	const location = useLocation();
	if (userIsLoggedIn) {
		return (
			<Menu mode='horizontal' defaultSelectedKeys={[location.pathname]} className='menu-padding'>
				<Menu.Item key='/auth'>
					<Link to='/auth'>Auth(wylogowywanie)</Link>
				</Menu.Item>
				<Menu.Item key='/user'>
					<Link to='/user'>UserAuth(wylogowywanie)</Link>
				</Menu.Item>
				<Menu.Item key='/admin/users'>
					<Link to='/admin/users'>Admin</Link>
				</Menu.Item>
			</Menu>
		);
	} else {
		return (
			<Menu mode='horizontal' defaultSelectedKeys={[location.pathname]} className='menu-padding'>
				<Menu.Item key='/'>
					<Link to='/'>HOME</Link>
				</Menu.Item>
				<Menu.Item key='/signin'>
					<Link to='/signin'>Zaloguj</Link>
				</Menu.Item>
			</Menu>
		);
	}
};

export default NavbarContainer;
