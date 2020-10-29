import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { weddingInitialState, WeddingsState } from './weddings.state';
import StatusType from 'App/types/requestStatus';
import { GetUserWeddingsRequest } from 'App/api/weddings/requests/getUserWeddingsRequest';
import { notification } from 'antd';
import { GetUsersWithAccessToWeddingResponse, GetWeddingDetailsResponse } from 'App/api/weddings/responses';

const { FAILED, INITIAL, LOADING, SUCCESS } = StatusType;

export const weddingSlice = createSlice({
	name: 'weddings',
	initialState: weddingInitialState,
	reducers: {
		getUserWeddingsStart: (state: WeddingsState) => {
			state.status.getUserWeddings = LOADING;
			state.weddings = null;
		},
		getUserWeddingsSuccess: (state: WeddingsState, action: PayloadAction<GetUserWeddingsRequest>) => {
			state.status.getUserWeddings = SUCCESS;
			const { data, ...queryParams } = action.payload;
			state.weddings = data;
			state.getUserWeddingsQueryParams = queryParams;
		},
		getUserWeddingsFailure: (state: WeddingsState, action: PayloadAction<string>) => {
			state.status.getUserWeddings = FAILED;
			state.weddings = null;
		},

		///

		createWeddingStart: (state: WeddingsState) => {
			state.status.createWedding = LOADING;
		},
		createWeddingSuccess: (state: WeddingsState) => {
			state.status.createWedding = SUCCESS;
			notification.success({
				message: 'Sukces!',
				description: 'Pomyślnie utworzono nowy plan!'
			});
		},
		createWeddingFailure: (state: WeddingsState, action: PayloadAction<string>) => {
			state.status.createWedding = FAILED;
			notification.error({
				message: 'Błąd!',
				description: 'Wystapił błąd przy tworzeniu wesela!'
			});
			console.log('ERROR at createWedding', action.payload);
		},

		///

		getWeddingDetailsStart: (state: WeddingsState) => {
			state.status.getWeddingDetails = LOADING;
			state.selectedWedding = null;
		},
		getWeddingDetailsSuccess: (state: WeddingsState, action: PayloadAction<GetWeddingDetailsResponse>) => {
			state.status.getWeddingDetails = SUCCESS;
			state.selectedWedding = action.payload;
		},
		getWeddingDetailsFailure: (state: WeddingsState, action: PayloadAction<string>) => {
			state.status.getWeddingDetails = FAILED;
			state.selectedWedding = null;
		},

		///

		deleteWeddingStart: (state: WeddingsState) => {
			state.status.deleteWedding = LOADING;
		},
		deleteWeddingSuccess: (state: WeddingsState) => {
			state.status.deleteWedding = SUCCESS;
		},
		deleteWeddingFailure: (state: WeddingsState) => {
			state.status.deleteWedding = FAILED;
		},

		///

		getUsersWithAccessToWeddingStart: (state: WeddingsState) => {
			state.status.getUsersWithAccessToWedding = LOADING;
		},
		getUsersWithAccessToWeddingSuccess: (
			state: WeddingsState,
			action: PayloadAction<GetUsersWithAccessToWeddingResponse[]>
		) => {
			state.status.getUsersWithAccessToWedding = SUCCESS;
			state.getUsersWithAccessToWedding = action.payload;
		},
		getUsersWithAccessToWeddingFailure: (state: WeddingsState, action: PayloadAction<any>) => {
			state.status.getUsersWithAccessToWedding = LOADING;
			state.getUsersWithAccessToWedding = null;
		}
	}
});

export const {
	getUserWeddingsFailure,
	getUserWeddingsStart,
	getUserWeddingsSuccess,
	createWeddingFailure,
	createWeddingStart,
	createWeddingSuccess,
	getWeddingDetailsFailure,
	getWeddingDetailsStart,
	getWeddingDetailsSuccess,
	deleteWeddingFailure,
	deleteWeddingStart,
	deleteWeddingSuccess,
	getUsersWithAccessToWeddingFailure,
	getUsersWithAccessToWeddingStart,
	getUsersWithAccessToWeddingSuccess
} = weddingSlice.actions;
