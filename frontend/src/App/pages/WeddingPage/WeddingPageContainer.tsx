import React from 'react';
import { Button, Layout, Modal } from 'antd';

import { RouteComponentProps, Switch } from 'react-router';
import ProtectedRoute from 'App/common/components/ProtectedRoute';
import CreateWeddingContainer from './containers/CreateWeddingContainer';
import { getUserWeddings } from 'App/state/weddings/weddings.thunk';
import GetUserWeddingsContainer from './containers/GetUserWeddinsContainer';
import ViewWeddingContainer from './containers/ViewWeddingContainer';

const WeddingPageContainer: React.FC<RouteComponentProps> = ({ history }) => {
	return (
		<Layout.Content>
			<Switch>
				<ProtectedRoute path='/user/weddings/create' component={CreateWeddingContainer} />
				<ProtectedRoute path='/user/weddings/:idWedding/view' component={ViewWeddingContainer} />
				<ProtectedRoute path='/user/weddings/:idWedding/update' component={CreateWeddingContainer} />
				<ProtectedRoute exact path='/user/weddings' component={GetUserWeddingsContainer} />
			</Switch>
		</Layout.Content>
	);
};

export default WeddingPageContainer;
