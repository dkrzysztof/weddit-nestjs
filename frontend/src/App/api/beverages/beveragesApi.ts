import { requests } from '../agent';
import { CreateBeverageRequest, UpdateBeverageRequest } from './requests';
import { GetBeveragesResponse } from './responses';

export const BeverageApi = {
	getBeverages: (idWedding: number): Promise<GetBeveragesResponse> => requests.get(`weddings/${idWedding}/beverages`),
	createBeverage: (idWedding: number, body: CreateBeverageRequest): Promise<any> =>
		requests.post(`/weddings/${idWedding}`, body),
	updateBeverage: (idWedding: number, idBeverage: number, body: UpdateBeverageRequest): Promise<any> =>
		requests.put(`/weddings/${idWedding}/beverages/${idBeverage}`, body),
	deleteBeverage: (idWedding: number): Promise<any> =>
		requests.delete(`/weddings/${idWedding}/beverages/${idWedding}`)
};
