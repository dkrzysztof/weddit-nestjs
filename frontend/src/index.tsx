import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App/App';
import store from './App/state/store';
import './i18n';

import './index.less';

function render(): void {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
}

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./App/App', render);
}
