import React from 'react';
import { Menu } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/state/root.reducer';

import './NavbarContainer.less';
import { devalidateSession } from 'App/state/session/session.thunk';

const NavbarContainer: React.FC<{}> = () => {
	const location = useLocation();
	const history = useHistory();

	const dispatch = useDispatch();
	const userIsLoggedIn = useSelector<RootState>(
		(state: RootState) => !!(state.session.info && state.session.info.token)
	);

	const handleLogOut = () => {
		dispatch(
			devalidateSession(() => {
				history.push('/');
			})
		);
	};

	if (userIsLoggedIn) {
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
				<Menu.Item style={{ float: 'right' }} onClick={handleLogOut}>
					Wyloguj
				</Menu.Item>
			</Menu>
		);
	} else {
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
	}
};

export default NavbarContainer;
