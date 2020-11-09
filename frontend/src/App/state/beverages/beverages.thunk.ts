import agent from 'App/api/agent';
import { CreateBeverageRequest, UpdateBeverageRequest } from 'App/api/beverages/requests';
import { IPageQueryParams } from 'App/types/pagination/pagination';
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

export const getBeverages = (params: IPageQueryParams, idWedding: number, onSuccess?: () => void): AppThunk => async (
	dispatch
) => {
	dispatch(getBeveragesStart());
	agent.Beverages.getBeverages(params, idWedding)
		.then((res) => {
			dispatch(getBeveragesSuccess(res));
			onSuccess();
		})
		.catch((err) => dispatch(getBeveragesFailure(err)));
};

export const createBeverage = (
	idWedding: number,
	body: CreateBeverageRequest,
	onSuccess?: () => void
): AppThunk => async (dispatch) => {
	dispatch(createBeverageStart());
	agent.Beverages.createBeverage(idWedding, body)
		.then((res) => {
			dispatch(createBeverageSuccess(res));
			onSuccess();
		})
		.catch((err) => dispatch(createBeverageFailure(err)));
};

export const deleteBeverage = (idWedding: number, idBeverage: number, onSuccess?: () => void): AppThunk => async (
	dispatch
) => {
	dispatch(deleteBeverageStart());
	agent.Beverages.deleteBeverage(idWedding, idBeverage)
		.then((res) => {
			dispatch(deleteBeverageSuccess(res));
			onSuccess();
		})
		.catch((err) => dispatch(deleteBeverageFailure(err)));
};

export const updateBeverage = (
	idWedding: number,
	idBeverage: number,
	body: UpdateBeverageRequest,
	onSuccess?: () => void
): AppThunk => async (dispatch) => {
	dispatch(updateBeverageStart());
	agent.Beverages.updateBeverage(idWedding, idBeverage, body)
		.then((res) => {
			dispatch(updateBeverageSuccess(res));
			onSuccess();
		})
		.catch((err) => dispatch(updateBeverageFailure(err)));
};
