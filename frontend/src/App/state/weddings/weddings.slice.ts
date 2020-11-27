import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { weddingInitialState, WeddingsState } from './weddings.state';
import StatusType from 'App/types/requestStatus';
import { GetUserWeddingsRequest } from 'App/api/weddings/requests/GetUserWeddingsRequest';
import { notification } from 'antd';
import {
	GetUsersWithAccessToWeddingResponse,
	GetWeddingDetailsResponse,
	UpdateUserAccessToWeddingResponse,
	UpdateWeddingResponse
} from 'App/api/weddings/responses';

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
			state.status.getWedding = LOADING;
			state.selectedWedding = null;
		},
		getWeddingDetailsSuccess: (state: WeddingsState, action: PayloadAction<GetWeddingDetailsResponse>) => {
			state.status.getWedding = SUCCESS;
			state.selectedWedding = action.payload;
			if (state.selectedWedding.budget)
				state.selectedWedding.budget = Number.parseFloat(state.selectedWedding.budget.toString());
		},
		getWeddingDetailsFailure: (state: WeddingsState, action: PayloadAction<string>) => {
			state.status.getWedding = FAILED;
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
		},

		///

		updateUserAccessToWeddingStart: (state: WeddingsState) => {
			state.status.updateUserAccessToWedding = LOADING;
		},
		updateUserAccessToWeddingSuccess: (
			state: WeddingsState,
			action: PayloadAction<UpdateUserAccessToWeddingResponse>
		) => {
			state.status.updateUserAccessToWedding = SUCCESS;
			notification.success({
				message: 'Sukces',
				description: `Przyznano dostęp użytkownikowi!`
			});
		},
		updateUserAccessToWeddingFailure: (state: WeddingsState, action: PayloadAction<string>) => {
			state.status.updateUserAccessToWedding = FAILED;
		},

		///

		removeUserAccessToWeddingStart: (state: WeddingsState) => {
			state.status.removeUserAccessToWedding = LOADING;
		},
		removeUserAccessToWeddingSuccess: (state: WeddingsState, action: PayloadAction<boolean>) => {
			state.status.removeUserAccessToWedding = SUCCESS;
			notification.success({
				message: 'Sukces',
				description: `Usunięto użytkownika z listy dostępowej!`
			});
		},
		removeUserAccessToWeddingFailure: (state: WeddingsState, action: PayloadAction<string>) => {
			state.status.removeUserAccessToWedding = FAILED;
			notification.error({
				message: 'Błąd!',
				description: 'Wystapił błąd przy usuwaniu dostępu!'
			});
			console.log('ERROR at removeUserAccessToWedding', action.payload);
		},

		///

		updateWeddingStart: (state: WeddingsState) => {
			state.status.updateWedding = LOADING;
		},
		updateWeddingSuccess: (state: WeddingsState, action: PayloadAction<UpdateWeddingResponse>) => {
			state.status.updateWedding = SUCCESS;
			notification.success({
				message: 'Sukces',
				description: `Pomyślnie zaaktualizowano dane!`
			});
		},
		updateWeddingFailure: (state: WeddingsState, action: PayloadAction<string>) => {
			state.status.updateWedding = FAILED;
			notification.error({
				message: 'Błąd!',
				description: 'Wystapił błąd przy aktualizacji danych wesela!'
			});
			console.log('ERROR at updateWedding', action.payload);
		},

		///

		addSeatChartStart: (state: WeddingsState) => {
			state.status.addSeatChart = LOADING;
		},
		addSeatChartSuccess: (state: WeddingsState, action: PayloadAction<boolean>) => {
			state.status.addSeatChart = SUCCESS;
			if (action.payload) {
				notification.success({
					message: 'Sukces',
					description: `Pomyślnie zapisano dane o sali weselnej!`
				});
			} else {
				notification.error({
					message: 'Hmmm?',
					description: `Coś nie tak z zapisaniem sali...`
				});
			}
		},
		addSeatChartFailure: (state: WeddingsState, action: PayloadAction<string>) => {
			state.status.addSeatChart = FAILED;
			notification.error({
				message: 'Błąd!',
				description: 'Wystapił błąd przy zapisywaniu układu sali!'
			});
			console.log('ERROR at addSeatChart', action.payload);
		},

		userWasNotified: (state: WeddingsState) => {
			state.notify = false;
		},
		deselectWedding: (state: WeddingsState) => {
			state.notify = true;
			state.status.getWedding = INITIAL;
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
	getWeddingDetailsSuccess,
	deleteWeddingFailure,
	deleteWeddingStart,
	deleteWeddingSuccess,
	getUsersWithAccessToWeddingFailure,
	getUsersWithAccessToWeddingStart,
	getUsersWithAccessToWeddingSuccess,
	updateUserAccessToWeddingFailure,
	updateUserAccessToWeddingStart,
	updateUserAccessToWeddingSuccess,
	removeUserAccessToWeddingFailure,
	removeUserAccessToWeddingStart,
	removeUserAccessToWeddingSuccess,
	updateWeddingFailure,
	updateWeddingStart,
	updateWeddingSuccess,
	addSeatChartFailure,
	addSeatChartStart,
	addSeatChartSuccess,
	deselectWedding,
	userWasNotified
} = weddingSlice.actions;
