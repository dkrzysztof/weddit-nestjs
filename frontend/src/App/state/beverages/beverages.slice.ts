import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorApi } from 'App/api/agent';
import { GetBeveragesResponse } from 'App/api/beverages/responses';
import StatusType from 'App/types/requestStatus';
import { BeveragesState, initialBeveragesState } from './beverages.state';

const { FAILED, LOADING, SUCCESS } = StatusType;

const beveragesSlice = createSlice({
	name: 'beverages',
	initialState: initialBeveragesState,
	reducers: {
		getBeveragesStart: (state: BeveragesState) => {
			state.status.getBeverages = LOADING;
		},
		getBeveragesSuccess: (state: BeveragesState, action: PayloadAction<GetBeveragesResponse>) => {
			state.status.getBeverages = SUCCESS;
			const { data, ...queryParams } = action.payload;

			state.beverages = data;
			state.queryParams = queryParams;
		},
		getBeveragesFailure: (state: BeveragesState, action: PayloadAction<ErrorApi>) => {
			state.status.getBeverages = FAILED;
			state.error = action.payload;
		},

		///

		createBeverageStart: (state: BeveragesState) => {
			state.status.createBeverage = LOADING;
		},
		createBeverageSuccess: (state: BeveragesState, action: PayloadAction<any>) => {
			state.status.createBeverage = SUCCESS;
		},
		createBeverageFailure: (state: BeveragesState, action: PayloadAction<ErrorApi>) => {
			state.status.createBeverage = FAILED;
			state.error = action.payload;
		},

		///

		updateBeverageStart: (state: BeveragesState) => {
			state.status.updateBeverage = LOADING;
		},
		updateBeverageSuccess: (state: BeveragesState, action: PayloadAction<any>) => {
			state.status.updateBeverage = SUCCESS;
		},
		updateBeverageFailure: (state: BeveragesState, action: PayloadAction<ErrorApi>) => {
			state.status.updateBeverage = FAILED;
			state.error = action.payload;
		},

		///

		deleteBeverageStart: (state: BeveragesState) => {
			state.status.deleteBeverage = LOADING;
		},
		deleteBeverageSuccess: (state: BeveragesState, action: PayloadAction<any>) => {
			state.status.deleteBeverage = SUCCESS;
		},
		deleteBeverageFailure: (state: BeveragesState, action: PayloadAction<ErrorApi>) => {
			state.status.deleteBeverage = FAILED;
			state.error = action.payload;
		}
	}
});

export const {
	createBeverageFailure,
	createBeverageStart,
	createBeverageSuccess,
	deleteBeverageFailure,
	deleteBeverageStart,
	deleteBeverageSuccess,
	getBeveragesFailure,
	getBeveragesStart,
	getBeveragesSuccess,
	updateBeverageFailure,
	updateBeverageStart,
	updateBeverageSuccess
} = beveragesSlice.actions;

export default beveragesSlice;
