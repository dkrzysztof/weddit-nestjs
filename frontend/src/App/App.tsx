// react
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// third-party
import { Layout } from 'antd';

// local direct
import Routes from './routes';
import './common/styles/bootstrap-utilities.less';
import NavbarContainer from './common/containers/NavbarContainer';

// styles
import './App.less';
import './common/styles/bootstrap-utilities.less';

const { Content, Header } = Layout;
const NAVBAR_HEIGHT = '66px';

const App: React.FC = () => {
	return (
		<Router>
			<Layout className='layout'>
				<Header className='fixed-header bg-site'>
					<NavbarContainer />
				</Header>
				<Content style={{ marginTop: NAVBAR_HEIGHT }}>
					<div className='content-layout'>
						<Routes />
					</div>
				</Content>
			</Layout>
		</Router>
	);
};

export default App;
