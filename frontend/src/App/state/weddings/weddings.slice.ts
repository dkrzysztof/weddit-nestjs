import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { weddingInitialState, WeddingsState } from './weddings.state';
import StatusType from 'App/types/requestStatus';
import { GetUserWeddingsRequest } from 'App/api/weddings/requests/getUserWeddingsResponse';
import { notification } from 'antd';
import { GetWeddingDetailsResponse } from 'App/api/weddings/responses';

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
				description: 'Wystapił błąd przy tworzeniu użytkownika!'
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
	getWeddingDetailsSuccess
} = weddingSlice.actions;
