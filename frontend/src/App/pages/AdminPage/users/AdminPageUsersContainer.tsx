import React from 'react';

import ProtectedRoute from 'App/common/components/ProtectedRoute';

import GetUsersContainer from './containers/GetUsersContainer';
import UpdateUserContainer from './containers/UpdateUserContainer';
import CreateUserContainer from './containers/CreateUserContainer';
import GetUserContainer from './containers/GetUserContainer';
import { Switch } from 'react-router';
import Role from 'App/types/role';

const AdminPageUsersContainer: React.FC<{}> = () => {
	return (
		<Switch>
			<ProtectedRoute adminRestriced exact path='/admin/users' component={GetUsersContainer} />
			<ProtectedRoute adminRestriced exact path='/admin/users/create' component={CreateUserContainer} />
			<ProtectedRoute adminRestriced exact path='/admin/users/:userId/update' component={UpdateUserContainer} />
			<ProtectedRoute adminRestriced path='/admin/users/:userId' component={GetUserContainer} />
		</Switch>
	);
};

export default AdminPageUsersContainer;
