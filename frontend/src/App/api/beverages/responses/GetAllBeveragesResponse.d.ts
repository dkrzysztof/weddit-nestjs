import { ICollectionResponse } from 'App/types/pagination/pagination';

export interface GetBeveragesResponse extends ICollectionResponse<BeverageForGetBeveragesResponse> {}

export interface BeverageForGetBeveragesResponse {
	idBeverage: number;
	name: string;
	bottleCapacity: string; //string
	consumingFactor: string; //string
	consumersCount: number;
	neededAmount: number;
	boughtAmount: number;
	remainingAmount: number;
	price: string; //string
}
