import { ICollectionResponse } from 'App/types/pagination/pagination';

export interface GetUserWeddingsRequest extends ICollectionResponse<WeddingForGetUserWeddings> {}

export interface WeddingForGetUserWeddings {
	idWedding: number;
	name: string;
	dateOfWedding: Date;
	address: string;
}
