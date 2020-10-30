import agent from 'App/api/agent';
import { CreateWeddingPlanRequest, UpdateUserAccessToWeddingRequest } from 'App/api/weddings/requests';
import { IPageQueryParams } from 'App/types/pagination/pagination';
import { AppThunk } from '../store';
import {
	createWeddingFailure,
	createWeddingStart,
	createWeddingSuccess,
	deleteWeddingSuccess,
	deleteWeddingFailure,
	deleteWeddingStart,
	getUserWeddingsFailure,
	getUserWeddingsStart,
	getUserWeddingsSuccess,
	getWeddingDetailsFailure,
	getWeddingDetailsStart,
	getWeddingDetailsSuccess,
	getUsersWithAccessToWeddingSuccess,
	getUsersWithAccessToWeddingFailure,
	getUsersWithAccessToWeddingStart,
	updateUserAccessToWeddingStart,
	updateUserAccessToWeddingSuccess,
	updateUserAccessToWeddingFailure,
	removeUserAccessToWeddingFailure,
	removeUserAccessToWeddingStart,
	removeUserAccessToWeddingSuccess
} from './weddings.slice';

export const getUserWeddings = (params: IPageQueryParams): AppThunk => async (dispatch) => {
	dispatch(getUserWeddingsStart());
	agent.Weddings.getUserWeddings(params)
		.then((res) => dispatch(getUserWeddingsSuccess(res)))
		.catch((err) => dispatch(getUserWeddingsFailure(err)));
};

export const createUserWedding = (body: CreateWeddingPlanRequest): AppThunk => async (dispatch) => {
	dispatch(createWeddingStart());
	agent.Weddings.createWedding(body)
		.then(() => dispatch(createWeddingSuccess()))
		.catch((err) => dispatch(createWeddingFailure(err)));
};

export const getWeddingDetails = (idWedding: number): AppThunk => async (dispatch) => {
	dispatch(getWeddingDetailsStart());
	agent.Weddings.getWeddingDetails(idWedding)
		.then((res) => dispatch(getWeddingDetailsSuccess(res)))
		.catch((err) => dispatch(getWeddingDetailsFailure(err)));
};

export const deleteWedding = (idWedding: number, params: IPageQueryParams): AppThunk => async (dispatch) => {
	dispatch(deleteWeddingStart());
	agent.Weddings.deleteWedding(idWedding)
		.then(() => {
			dispatch(deleteWeddingSuccess());
			dispatch(getUserWeddings(params));
		})
		.catch((err) => dispatch(deleteWeddingFailure()));
};

export const getUsersWithAccessToWedding = (idWedding: number): AppThunk => async (dispatch) => {
	dispatch(getUsersWithAccessToWeddingStart());
	agent.Weddings.getUsersWithAccessToWedding(idWedding)
		.then((res) => dispatch(getUsersWithAccessToWeddingSuccess(res)))
		.catch((err) => dispatch(getUsersWithAccessToWeddingFailure(err)));
};

export const updateUserAccessToWedding = (
	idWedding: number,
	body: UpdateUserAccessToWeddingRequest,
	onSuccess: () => void
): AppThunk => async (dispatch) => {
	dispatch(updateUserAccessToWeddingStart());
	agent.Weddings.updateUserAccessToWedding(idWedding, body)
		.then((res) => {
			onSuccess();
			dispatch(updateUserAccessToWeddingSuccess(res));
			dispatch(getUsersWithAccessToWedding(idWedding));
		})
		.catch((err) => dispatch(updateUserAccessToWeddingFailure(err)));
};

export const removeUserAccessToWedding = (idWedding: number, idUser: number): AppThunk => async (dispatch) => {
	dispatch(removeUserAccessToWeddingStart());
	agent.Weddings.removeUserAccessToWeddings(idWedding, idUser)
		.then((res) => {
			dispatch(removeUserAccessToWeddingSuccess(res));
			dispatch(getUsersWithAccessToWedding(idWedding));
		})
		.catch((err) => dispatch(removeUserAccessToWeddingFailure(err)));
};
