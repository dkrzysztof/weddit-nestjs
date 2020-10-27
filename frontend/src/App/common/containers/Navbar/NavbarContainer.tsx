import React from 'react';
import { Menu } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/state/root.reducer';

import './NavbarContainer.less';
import { devalidateSession } from 'App/state/session/session.thunk';
import PublicNavbar from './components/PublicNavbar';
import AdminNavbar from './components/AdminNavbar';
import UserNavbar from './components/UserNavbar';

const NavbarContainer: React.FC<{}> = () => {
	const location = useLocation();
	const history = useHistory();

	const dispatch = useDispatch();
	const userIsLoggedIn = useSelector<RootState>(
		(state: RootState) => !!(state.session.info && state.session.info.token)
	);

	const userIsAdmin = useSelector<RootState>(
		(state: RootState) => !!(state.session.user && state.session.user.isAdmin)
	);

	const handleLogOut = () => {
		dispatch(
			devalidateSession(() => {
				history.push('/');
			})
		);
	};

	if (userIsLoggedIn && userIsAdmin) {
		return <AdminNavbar onLogOut={handleLogOut} location={location} />;
	}

	if (userIsLoggedIn && !userIsAdmin) {
		return <UserNavbar onLogOut={handleLogOut} location={location} />;
	}

	if (!userIsLoggedIn) {
		return <PublicNavbar location={location} />;
	}
};

export default NavbarContainer;
