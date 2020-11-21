import { GetGuestsResponse, GuestForGetGuestsResponse } from 'App/api/guests/responses';
import { GetGuestsShortCollectionResponse } from 'App/api/guests/responses/GetGuestsShortCollectionResponse';
import { GetGuestTypesResponse } from 'App/api/guestTypes/responses';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { IPageQueryParams } from 'App/types/pagination/pagination';
import StatusType from 'App/types/requestStatus';

export interface GuestState {
	status: {
		getGuests: StatusType;
		createGuest: StatusType;
		updateGuest: StatusType;
		deleteGuest: StatusType;
		getGuestTypes: StatusType;
		updateGuestType: StatusType;
		createGuestType: StatusType;
		getGuestsShortCollection: StatusType;
	};
	guests: GuestForGetGuestsResponse[] | null;
	guestsShort: GetGuestsShortCollectionResponse[] | null;
	guestTypes: GetGuestTypesResponse;
	selectedGuest: GuestForGetGuestsResponse | null;
	selectedGuestId: number | null;
	guestsQueryParams: IPageQueryParams;
}

export const initialGuestState: GuestState = {
	status: {
		getGuestsShortCollection: StatusType.INITIAL,
		getGuests: StatusType.INITIAL,
		createGuest: StatusType.INITIAL,
		updateGuest: StatusType.INITIAL,
		deleteGuest: StatusType.INITIAL,
		getGuestTypes: StatusType.INITIAL,
		updateGuestType: StatusType.INITIAL,
		createGuestType: StatusType.INITIAL
	},
	guests: null,
	guestsShort: null,
	guestTypes: null,
	selectedGuest: null,
	selectedGuestId: null,
	guestsQueryParams: defaultPageQueryParams
};
