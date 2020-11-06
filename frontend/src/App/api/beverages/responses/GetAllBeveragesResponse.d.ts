export type GetBeveragesResponse = BeverageForGetBeveragesResponse[];

export interface BeverageForGetBeveragesResponse {
	idBeverages: number;
	name: string;
	bottleCapacity: string; //string
	consumingFactor: string; //string
	consumersCount: number;
	neededAmount: number;
	boughtAmount: number;
	remainingAmount: number;
	price: string; //string
}
