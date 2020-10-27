import agent from 'App/api/agent';
import { CreateWeddingPlanRequest } from 'App/api/weddings/requests';
import { IPageQueryParams } from 'App/types/pagination/pagination';
import { getUserDetailsSuccess } from '../session/session.slice';
import { AppThunk } from '../store';
import {
	createWeddingFailure,
	createWeddingStart,
	createWeddingSuccess,
	getUserWeddingsFailure,
	getUserWeddingsStart,
	getUserWeddingsSuccess,
	getWeddingDetailsFailure,
	getWeddingDetailsStart,
	getWeddingDetailsSuccess
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
