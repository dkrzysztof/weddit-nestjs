import { IPageQueryParams } from 'App/types/pagination/pagination';
import { requests } from '../agent';
import { CreateBeverageRequest, UpdateBeverageRequest } from './requests';
import { GetBeveragesResponse } from './responses';

export const BeverageApi = {
	getBeverages: (params: IPageQueryParams, idWedding: number): Promise<GetBeveragesResponse> =>
		requests.get(`/weddings/${idWedding}/beverages`, params),
	createBeverage: (idWedding: number, body: CreateBeverageRequest): Promise<any> =>
		requests.post(`/weddings/${idWedding}/beverages`, body),
	updateBeverage: (idWedding: number, idBeverage: number, body: UpdateBeverageRequest): Promise<any> =>
		requests.put(`/weddings/${idWedding}/beverages/${idBeverage}`, body),
	deleteBeverage: (idWedding: number, idBeverage: number): Promise<any> =>
		requests.delete(`/weddings/${idWedding}/beverages/${idBeverage}`)
};
