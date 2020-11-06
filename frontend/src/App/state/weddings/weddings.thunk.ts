import agent from 'App/api/agent';
import { CreateWeddingPlanRequest, UpdateUserAccessToWeddingRequest } from 'App/api/weddings/requests';
import { UpdateWeddingRequest } from 'App/api/weddings/requests/UpdateWeddingRequest';
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
	removeUserAccessToWeddingSuccess,
	updateWeddingFailure,
	updateWeddingStart,
	updateWeddingSuccess
} from './weddings.slice';

export const getUserWeddings = (params: IPageQueryParams): AppThunk => async (dispatch) => {
	dispatch(getUserWeddingsStart());
	agent.Wedding.getUserWeddings(params)
		.then((res) => dispatch(getUserWeddingsSuccess(res)))
		.catch((err) => dispatch(getUserWeddingsFailure(err)));
};

export const createUserWedding = (body: CreateWeddingPlanRequest): AppThunk => async (dispatch) => {
	dispatch(createWeddingStart());
	agent.Wedding.createWedding(body)
		.then(() => dispatch(createWeddingSuccess()))
		.catch((err) => dispatch(createWeddingFailure(err)));
};

export const getWeddingDetails = (idWedding: number): AppThunk => async (dispatch) => {
	dispatch(getWeddingDetailsStart());
	agent.Wedding.getWeddingDetails(idWedding)
		.then((res) => dispatch(getWeddingDetailsSuccess(res)))
		.catch((err) => dispatch(getWeddingDetailsFailure(err)));
};

export const deleteWedding = (idWedding: number, params: IPageQueryParams): AppThunk => async (dispatch) => {
	dispatch(deleteWeddingStart());
	agent.Wedding.deleteWedding(idWedding)
		.then(() => {
			dispatch(deleteWeddingSuccess());
			dispatch(getUserWeddings(params));
		})
		.catch((err) => dispatch(deleteWeddingFailure()));
};

export const getUsersWithAccessToWedding = (idWedding: number): AppThunk => async (dispatch) => {
	dispatch(getUsersWithAccessToWeddingStart());
	agent.Wedding.getUsersWithAccessToWedding(idWedding)
		.then((res) => dispatch(getUsersWithAccessToWeddingSuccess(res)))
		.catch((err) => dispatch(getUsersWithAccessToWeddingFailure(err)));
};

export const updateUserAccessToWedding = (
	idWedding: number,
	body: UpdateUserAccessToWeddingRequest,
	onSuccess: () => void
): AppThunk => async (dispatch) => {
	dispatch(updateUserAccessToWeddingStart());
	agent.Wedding.updateUserAccessToWedding(idWedding, body)
		.then((res) => {
			onSuccess();
			dispatch(updateUserAccessToWeddingSuccess(res));
			dispatch(getUsersWithAccessToWedding(idWedding));
		})
		.catch((err) => dispatch(updateUserAccessToWeddingFailure(err)));
};

export const removeUserAccessToWedding = (idWedding: number, idUser: number): AppThunk => async (dispatch) => {
	dispatch(removeUserAccessToWeddingStart());
	agent.Wedding.removeUserAccessToWeddings(idWedding, idUser)
		.then((res) => {
			dispatch(removeUserAccessToWeddingSuccess(res));
			dispatch(getUsersWithAccessToWedding(idWedding));
		})
		.catch((err) => dispatch(removeUserAccessToWeddingFailure(err)));
};

export const updateWedding = (idWedding: number, body: UpdateWeddingRequest): AppThunk => async (dispatch) => {
	dispatch(updateWeddingStart());
	const promise = agent.Wedding.updateWeddingDetails(idWedding, body);
	console.log(body);
	setTimeout(() => {
		promise.then((res) => dispatch(updateWeddingSuccess(res))).catch((err) => dispatch(updateWeddingFailure(err)));
	}, 750);
};
