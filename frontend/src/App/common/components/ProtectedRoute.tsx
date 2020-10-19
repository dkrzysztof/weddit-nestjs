import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Route, Redirect, RouteChildrenProps } from 'react-router-dom';

import LoadingScreen from './LoadingScreen';
import agent from 'App/api/agent';
import { RootState } from 'App/state/root.reducer';
import { mapStateToProps } from 'App/state/utils/connect';

interface ProtectedRouteState {
	isLoading: boolean;
}

interface OwnProps {
	component: React.FC<any> | React.ComponentType<any>;
	path: string;
	exact?: boolean;
	adminRestriced?: boolean;
	others?: any;
}

interface ProtectedRouteProps extends DispatchProp, RootState, OwnProps {}

class ProtectedRoute extends React.Component<ProtectedRouteProps, ProtectedRouteState> {
	constructor(props) {
		super(props);

		let isUserAuthenticated = this.checkIfUserIsAuthenticated();

		this.state = {
			isLoading: !isUserAuthenticated
		};
	}

	componentDidMount() {
		if (!this.checkIfUserIsAuthenticated()) {
			agent.Auth.refreshToken()
				.then((result) => {
					console.log(result);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	checkIfUserIsAuthenticated(): boolean {
		const { session } = this.props;
		return !!(session.info && session.info.token);
	}

	checkIfUserIsAuthorized(): boolean {
		const { session, adminRestriced } = this.props;

		return !adminRestriced || (session && session.user && session.user.isAdmin);
	}

	render() {
		const { component: Component, others, ...rest } = this.props;
		return (
			<Route
				{...rest}
				render={(props: RouteChildrenProps) => {
					if (this.state.isLoading) {
						return <LoadingScreen container='screen' />;
					} else if (this.checkIfUserIsAuthorized() && this.checkIfUserIsAuthenticated()) {
						return <Component {...others} {...props} />;
					} else {
						return (
							<Redirect
								to={{
									pathname: '/signin',
									state: props.location
								}}
							/>
						);
					}
				}}
			/>
		);
	}
}

export default connect<RootState, DispatchProp, OwnProps>(mapStateToProps)(ProtectedRoute);
