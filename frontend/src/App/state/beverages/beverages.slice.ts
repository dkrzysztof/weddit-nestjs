import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorApi } from 'App/api/agent';
import { GetBeveragesResponse } from 'App/api/beverages/responses';
import StatusType from 'App/types/requestStatus';
import { BeveragesState, initialBeveragesState } from './beverages.state';

const { INITIAL, FAILED, LOADING, SUCCESS } = StatusType;

const beveragesSlice = createSlice({
	name: 'beverages',
	initialState: initialBeveragesState,
	reducers: {
		getBeveragesStart: (state: BeveragesState) => {
			state.status.getBeverages = LOADING;
		},
		getBeveragesSuccess: (state: BeveragesState, action: PayloadAction<GetBeveragesResponse>) => {
			state.status.getBeverages = SUCCESS;
			state.beverages = action.payload;
		},
		getBeveragesFailure: (state: BeveragesState, action: PayloadAction<ErrorApi>) => {
			state.status.getBeverages = FAILED;
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
		},

		///

		updateBeverageStart: (state: BeveragesState) => {
			state.status.updateBeverage = LOADING;
		},
		updateBeverageSuccess: (state: BeveragesState, action: PayloadAction<any>) => {
			state.status.updateBeverage = SUCCESS;
			state.beverages = action.payload;
		},
		updateBeverageFailure: (state: BeveragesState, action: PayloadAction<ErrorApi>) => {
			state.status.updateBeverage = FAILED;
		},

		///

		deleteBeverageStart: (state: BeveragesState) => {
			state.status.deleteBeverage = LOADING;
		},
		deleteBeverageSuccess: (state: BeveragesState, action: PayloadAction<any>) => {
			state.status.deleteBeverage = SUCCESS;
			state.beverages = action.payload;
		},
		deleteBeverageFailure: (state: BeveragesState, action: PayloadAction<ErrorApi>) => {
			state.status.deleteBeverage = FAILED;
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
