import appConfig from 'app.config';
import { IPageQueryParams } from 'App/types/pagination/pagination';
import { request } from 'http';
import { requests } from '../agent';
import { CreateWeddingPlanRequest, GetUserWeddings } from './requests';
import { GetWeddingDetailsResponse } from './responses';

const { urlToIncludeInEmail } = appConfig;

export const WeddingsApi = {
	getUserWeddings: (params: IPageQueryParams): Promise<GetUserWeddings> => requests.get('weddings', params),
	createWedding: (body: CreateWeddingPlanRequest): Promise<GetUserWeddings> => requests.post('weddings', body),
	getWeddingDetails: (idWedding: number): Promise<GetWeddingDetailsResponse> => requests.get(`weddings/${idWedding}`)
};
