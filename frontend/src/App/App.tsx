import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';

import Routes from './routes';
import './common/styles/bootstrap-utilities.less';
import NavbarContainer from './common/containers/Navbar/NavbarContainer';

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
				<Content style={{ marginTop: NAVBAR_HEIGHT, backgroundColor: '#fff' }}>
					<div className='content-layout'>
						<Routes />
					</div>
				</Content>
			</Layout>
		</Router>
	);
};

export default App;
