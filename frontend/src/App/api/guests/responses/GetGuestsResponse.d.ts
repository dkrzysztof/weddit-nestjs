import { ICollectionResponse } from 'App/types/pagination/pagination';

export interface GetGuestsResponse extends ICollectionResponse<GuestForGetGuestsResponse> {}

export interface GuestForGetGuestsResponse {
	idGuest: number;
	firstName: string;
	lastName: string;
	confirmed: boolean;
	confirmedAfters: boolean;
	numberTable: number;
	numberSeat: number;
	guestType: string | null;
	idGuestType: number;
}
