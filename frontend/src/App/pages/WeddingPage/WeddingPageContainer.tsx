import React from 'react';
import { Button, Layout, Modal } from 'antd';

import { RouteComponentProps, Switch } from 'react-router';
import ProtectedRoute from 'App/common/components/ProtectedRoute';
import CreateWeddingContainer from './containers/CreateWeddingContainer';
import { getUserWeddings } from 'App/state/weddings/weddings.thunk';
import GetUserWeddingsContainer from './containers/GetUserWeddingsContainer';
import ViewWeddingContainer from './containers/ViewWeddingContainer';
import SettingsWeddingContainer from './containers/SettingsWeddingContainer';
import GuestsPageContainer from '../GuestsPage/GuestsPageContainer';
import TaskListPageContainer from '../TaskListPage/TaskListPageContainer';
import BeveragePageContainer from '../BeveragePage/BeveragePageContainer';

const WeddingPageContainer: React.FC<RouteComponentProps> = () => {
	return (
		<Layout.Content>
			<Switch>
				<ProtectedRoute path='/weddings/create' component={CreateWeddingContainer} />
				<ProtectedRoute path='/weddings/:idWedding/view' component={ViewWeddingContainer} />
				<ProtectedRoute exact path='/weddings/:idWedding/update' component={SettingsWeddingContainer} />
				<ProtectedRoute exact path='/weddings/:idWedding/guests' component={GuestsPageContainer} />
				<ProtectedRoute exact path='/weddings/:idWedding/beverages' component={BeveragePageContainer} />
				<ProtectedRoute exact path='/weddings/:idWedding/task-list' component={TaskListPageContainer} />
				<ProtectedRoute exact path='/weddings' component={GetUserWeddingsContainer} />
			</Switch>
		</Layout.Content>
	);
};

export default WeddingPageContainer;
