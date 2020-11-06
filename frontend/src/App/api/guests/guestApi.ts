import { requests } from '../agent';
import { CreateGuestRequest, UpdateGuestRequest } from './requests';
import { GetGuestsRequest } from './requests/GetGuestsRequest';
import { DeleteGuestResponse, GetGuestsResponse, UpdateGuestResponse } from './responses';

const GuestApi = {
	getGuests: (idWedding: number, params: GetGuestsRequest): Promise<GetGuestsResponse> =>
		requests.get(`weddings/${idWedding}/guests`, params),
	// getGuest: (idWedding: number, idGuest: number): Promise<GetGuestResponse> => {},
	createGuest: (idWedding: number, body: CreateGuestRequest): Promise<CreateGuestRequest> =>
		requests.post(`weddings/${idWedding}/guests`, body),
	updateGuest: (idWedding: number, idGuest: number, body: UpdateGuestRequest): Promise<UpdateGuestResponse> =>
		requests.put(`weddings/${idWedding}/guests/${idGuest}`, body),
	deleteGuest: (idWedding: number, idGuest: number): Promise<DeleteGuestResponse> =>
		requests.delete(`weddings/${idWedding}/guests/${idGuest}`)
};

export default GuestApi;
