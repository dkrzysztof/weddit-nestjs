import { AppThunk } from '../store';
import {
	authenticationStart,
	authenticationSuccess,
	getUserDetailsStart,
	getUserDetailsSuccess,
	getUserDetailsFailure,
	authenticationFailure,
	devalidateSessionStart,
	devalidateSessionSuccess,
	devalidateSessionFailure,
	cleanUpSessionStatusStart
} from './session.slice';
import { LoginRequest } from 'App/api/auth/requests';
import agent from 'App/api/agent';
import { LoginResponse } from 'App/api/auth/responses';
import { GetAccountDetailsResponse } from 'App/api/account/responses';
import { ErrorHandledResponse } from 'App/types/error';

export const authenticateUser = (
	payload?: LoginRequest,
	onSuccess?: () => void,
	onError?: (error: ErrorHandledResponse) => void
): AppThunk => async (dispatch) => {
	dispatch(authenticationStart());
	agent.Auth.login(payload)
		.then((response: LoginResponse) => {
			dispatch(authenticationSuccess(response));
			dispatch(getUserDetailsStart());
			agent.Account.getAccountDetails()
				.then((accountDetailsResponse: GetAccountDetailsResponse) => {
					dispatch(getUserDetailsSuccess(accountDetailsResponse));
					onSuccess();
				})
				.catch((error: any) => {
					dispatch(getUserDetailsFailure());
				});
		})
		.catch((e: ErrorHandledResponse) => {
			if (e.code === 403) onError(e);
			dispatch(authenticationFailure(e));
		});
};

export const devalidateSession = (onSuccess?: () => void): AppThunk => async (dispatch) => {
	dispatch(devalidateSessionStart());

	try {
		setTimeout(() => {
			dispatch(devalidateSessionSuccess());
			onSuccess();
		}, 200);
	} catch (error) {
		dispatch(devalidateSessionFailure(error));
	}
};

export const cleanUpSessionStatus = (): AppThunk => async (dispatch) => {
	dispatch(cleanUpSessionStatusStart());
};
