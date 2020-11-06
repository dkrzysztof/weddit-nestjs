import { requests } from '../agent';
import { CreateGuestTypeRequest, UpdateGuestTypeRequest } from './requests';
import { GetGuestTypesResponse } from './responses';

export const GuestTypesApi = {
	getGuestTypes: (): Promise<GetGuestTypesResponse> => requests.get('/guest-types'),
	updateGuestType: (idGuestType: number, body: UpdateGuestTypeRequest): Promise<any> =>
		requests.put(`/guest-types/${idGuestType}`, body),
	createGuestType: (body: CreateGuestTypeRequest): Promise<any> => requests.post(`/guest-types`, body)
};
