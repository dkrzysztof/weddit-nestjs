import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sessionInitialState, SessionState } from './session.state';
import { GetAccountDetailsResponse } from 'App/api/account/responses/getAccountDetailsResponse';
import { LoginResponse } from 'App/api/auth/responses';
import { StatusType } from 'App/types/requestStatus';
import { notification } from 'antd';
import { ErrorHandledResponse } from 'App/types/error';

const { FAILED, SUCCESS, LOADING } = StatusType;

const sessionSlice = createSlice({
	name: 'session',
	initialState: sessionInitialState,
	reducers: {
		authenticationStart: (state: SessionState) => {
			state.status.authentication = LOADING;
		},
		authenticationSuccess: (state: SessionState, action: PayloadAction<LoginResponse>) => {
			state.status.authentication = SUCCESS;
			state.info = action.payload;

			localStorage.setItem('token', action.payload.token);
		},
		authenticationFailure: (state: SessionState, action: PayloadAction<ErrorHandledResponse>) => {
			const { description, message, code } = action.payload;
			if (code === 400) {
				notification.error({ message, description });
			}
			state.status.authentication = FAILED;
		},

		getUserDetailsStart: (state: SessionState) => {
			state.status.getUserDetails = LOADING;
		},
		getUserDetailsSuccess: (state: SessionState, action: PayloadAction<GetAccountDetailsResponse>) => {
			state.status.getUserDetails = SUCCESS;

			let { createdAt, ...detailsData } = action.payload;
			let createdAtDate = new Date(createdAt);

			state.user = { ...detailsData, createdAt: createdAtDate };
			state.error = null;
		},
		getUserDetailsFailure: (state: SessionState, action: PayloadAction<string[]>) => {
			state.status.getUserDetails = FAILED;
			state.error = action.payload;
		},
		devalidateSessionStart: (state: SessionState) => {
			state.status.devalidateSession = LOADING;
		},
		devalidateSessionFailure: (state: SessionState, action: PayloadAction<any>) => {
			state.status.devalidateSession = FAILED;
			state.error = action.payload;
		},
		devalidateSessionSuccess: (state: SessionState) => {
			state.status.devalidateSession = SUCCESS;
			state.user = null;
			state.error = null;
			state.info = null;

			localStorage.removeItem('token');
		},

		cleanUpSessionStatusStart: (state: SessionState) => {
			state.status = sessionInitialState.status;
			state.error = sessionInitialState.error;
		}
	}
});

export default sessionSlice;

export const {
	authenticationStart,
	authenticationSuccess,
	authenticationFailure,
	getUserDetailsStart,
	getUserDetailsFailure,
	getUserDetailsSuccess,
	devalidateSessionFailure,
	devalidateSessionStart,
	devalidateSessionSuccess,

	cleanUpSessionStatusStart
} = sessionSlice.actions;
