import { ICollectionResponse } from 'App/types/pagination/pagination';

// export interface GetUsersResponse extends ICollectionResponse<UserForGetUsersResponse> {}

export type GetUsersResponse = UserForGetUsersResponse[];

export interface UserForGetUsersResponse {
	idUser: number;
	firstName: string;
	lastName: string;
	email: string;
	isAdmin: boolean;
	createdAt: string;
}
