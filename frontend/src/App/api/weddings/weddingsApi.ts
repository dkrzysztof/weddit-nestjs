import appConfig from 'app.config';
import { IPageQueryParams } from 'App/types/pagination/pagination';
import { request } from 'http';
import { requests } from '../agent';
import { CreateWeddingPlanRequest, GetUserWeddings, UpdateUserAccessToWeddingRequest } from './requests';
import { UpdateWeddingRequest } from './requests/UpdateWeddingRequest';
import {
	GetUsersWithAccessToWeddingResponse,
	GetWeddingDetailsResponse,
	UpdateUserAccessToWeddingResponse,
	UpdateWeddingResponse
} from './responses';

export const WeddingsApi = {
	createWedding: (body: CreateWeddingPlanRequest): Promise<GetUserWeddings> => requests.post('weddings', body),

	getWeddingDetails: (idWedding: number): Promise<GetWeddingDetailsResponse> => requests.get(`weddings/${idWedding}`),

	deleteWedding: (idWedding: number): Promise<boolean> => requests.delete(`weddings/${idWedding}`),

	updateWeddingDetails: (idWedding: number, body: UpdateWeddingRequest): Promise<UpdateWeddingResponse> =>
		requests.put(`weddings/${idWedding}`, body),

	getUsersWithAccessToWedding: (idWedding: number): Promise<GetUsersWithAccessToWeddingResponse[]> =>
		requests.get(`weddings/${idWedding}/users`),

	updateUserAccessToWedding: (
		idWedding: number,
		body: UpdateUserAccessToWeddingRequest
	): Promise<UpdateUserAccessToWeddingResponse> => requests.post(`weddings/${idWedding}/users`, body),

	removeUserAccessToWeddings: (idWedding: number, idUser: number): Promise<boolean> =>
		requests.delete(`weddings/${idWedding}/users/${idUser}`),

	getUserWeddings: (params: IPageQueryParams): Promise<GetUserWeddings> => requests.get('weddings', params)
};
