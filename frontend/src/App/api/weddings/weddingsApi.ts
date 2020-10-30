import appConfig from 'app.config';
import { IPageQueryParams } from 'App/types/pagination/pagination';
import { request } from 'http';
import { requests } from '../agent';
import { CreateWeddingPlanRequest, GetUserWeddings, UpdateUserAccessToWeddingRequest } from './requests';
import {
	GetUsersWithAccessToWeddingResponse,
	GetWeddingDetailsResponse,
	UpdateUserAccessToWeddingResponse
} from './responses';

const { urlToIncludeInEmail } = appConfig;

export const WeddingsApi = {
	getUserWeddings: (params: IPageQueryParams): Promise<GetUserWeddings> => requests.get('weddings', params),

	createWedding: (body: CreateWeddingPlanRequest): Promise<GetUserWeddings> => requests.post('weddings', body),

	getWeddingDetails: (idWedding: number): Promise<GetWeddingDetailsResponse> => requests.get(`weddings/${idWedding}`),

	deleteWedding: (idWedding: number): Promise<boolean> => requests.delete(`weddings/${idWedding}`),

	getUsersWithAccessToWedding: (idWedding: number): Promise<GetUsersWithAccessToWeddingResponse[]> =>
		requests.get(`weddings/${idWedding}/users`),

	updateUserAccessToWedding: (
		idWedding: number,
		body: UpdateUserAccessToWeddingRequest
	): Promise<UpdateUserAccessToWeddingResponse> => requests.post(`weddings/${idWedding}/users`, body),

	removeUserAccessToWeddings: (idWedding: number, idUser: number): Promise<boolean> =>
		requests.delete(`weddings/${idWedding}/users/${idUser}`)
};
