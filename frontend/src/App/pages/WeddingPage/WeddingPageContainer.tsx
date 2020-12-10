import React from 'react';
import { Layout } from 'antd';

import { RouteComponentProps, Switch } from 'react-router';
import ProtectedRoute from 'App/common/components/ProtectedRoute';
import CreateWeddingContainer from './containers/CreateWeddingContainer';
import GetUserWeddingsContainer from './containers/GetUserWeddingsContainer';
import ViewWeddingContainer from './containers/ViewWeddingContainer';
import SettingsWeddingContainer from './containers/SettingsWeddingContainer';
import GuestsPageContainer from '../GuestsPage/GuestsPageContainer';
import TaskListPageContainer from '../TaskListPage/TaskListPageContainer';
import BeveragePageContainer from '../BeveragePage/BeveragePageContainer';
import SeatChartPageContainer from '../SeatChartPage/SeatDiagramPageContainer';

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
				<ProtectedRoute exact path='/weddings/:idWedding/seat-chart' component={SeatChartPageContainer} />
				<ProtectedRoute exact path='/weddings' component={GetUserWeddingsContainer} />
			</Switch>
		</Layout.Content>
	);
};

export default WeddingPageContainer;
