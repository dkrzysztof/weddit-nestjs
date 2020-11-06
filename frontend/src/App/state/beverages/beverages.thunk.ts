import agent from 'App/api/agent';
import { CreateBeverageRequest, UpdateBeverageRequest } from 'App/api/beverages/requests';
import { AppThunk } from '../store';
import {
	getBeveragesStart,
	getBeveragesSuccess,
	getBeveragesFailure,
	createBeverageFailure,
	createBeverageStart,
	createBeverageSuccess,
	deleteBeverageFailure,
	deleteBeverageStart,
	deleteBeverageSuccess,
	updateBeverageFailure,
	updateBeverageStart,
	updateBeverageSuccess
} from './beverages.slice';

export const getBeverages = (idWedding: number): AppThunk => async (dispatch) => {
	dispatch(getBeveragesStart());
	agent.Beverages.getBeverages(idWedding)
		.then((res) => dispatch(getBeveragesSuccess(res)))
		.catch((err) => dispatch(getBeveragesFailure(err)));
};

export const createBeverage = (idWedding: number, body: CreateBeverageRequest): AppThunk => async (dispatch) => {
	dispatch(createBeverageStart());
	agent.Beverages.createBeverage(idWedding, body)
		.then((res) => dispatch(createBeverageSuccess(res)))
		.catch((err) => dispatch(createBeverageFailure(err)));
};

export const deleteBeverage = (idWedding: number): AppThunk => async (dispatch) => {
	dispatch(deleteBeverageStart());
	agent.Beverages.deleteBeverage(idWedding)
		.then((res) => dispatch(deleteBeverageSuccess(res)))
		.catch((err) => dispatch(deleteBeverageFailure(err)));
};

export const updateBeverage = (idWedding: number, idBeverage: number, body: UpdateBeverageRequest): AppThunk => async (
	dispatch
) => {
	dispatch(updateBeverageStart());
	agent.Beverages.updateBeverage(idWedding, idBeverage, body)
		.then((res) => dispatch(updateBeverageSuccess(res)))
		.catch((err) => dispatch(updateBeverageFailure(err)));
};
