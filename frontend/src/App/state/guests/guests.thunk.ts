import agent from 'App/api/agent';
import { CreateGuestRequest, UpdateGuestRequest } from 'App/api/guests/requests';
import { GetGuestsRequest } from 'App/api/guests/requests/GetGuestsRequest';
import { CreateGuestTypeRequest, UpdateGuestTypeRequest } from 'App/api/guestTypes/requests';
import { IPageQueryParams } from 'App/types/pagination/pagination';
import { AppThunk } from '../store';
import {
	createGuestFailure,
	createGuestStart,
	createGuestSuccess,
	getGuestsFailure,
	getGuestsStart,
	getGuestsSuccess,
	updateGuestFailure,
	updateGuestStart,
	updateGuestSuccess,
	deleteGuestFailure,
	deleteGuestStart,
	deleteGuestSuccess,
	getGuestTypesFailure,
	getGuestTypesStart,
	getGuestTypesSuccess,
	createGuestTypeFailure,
	createGuestTypeStart,
	createGuestTypeSuccess,
	updateGuestTypeFailure,
	updateGuestTypeStart,
	updateGuestTypeSuccess,
	getGuestsShortCollectionStart,
	getGuestsShortCollectionSuccess,
	getGuestsShortCollectionFailure
} from './guests.slice';

export const getGuests = (idWedding: number, params: GetGuestsRequest): AppThunk => async (dispatch) => {
	dispatch(getGuestsStart());
	agent.Guests.getGuests(idWedding, params)
		.then((res) => dispatch(getGuestsSuccess(res)))
		.catch((err) => dispatch(getGuestsFailure(err)));
};

export const getGuestsShort = (idWedding: number, onSuccess?: () => void): AppThunk => async (dispatch) => {
	dispatch(getGuestsShortCollectionStart());
	agent.Guests.getGuestsShort(idWedding)
		.then((res) => {
			dispatch(getGuestsShortCollectionSuccess(res));
			onSuccess();
		})
		.catch((err) => dispatch(getGuestsShortCollectionFailure(err)));
};

export const createGuest = (idWedding: number, body: CreateGuestRequest, params?: IPageQueryParams): AppThunk => async (
	dispatch
) => {
	dispatch(createGuestStart());
	agent.Guests.createGuest(idWedding, body)
		.then(() => {
			dispatch(createGuestSuccess());
			if (params) {
				dispatch(getGuests(idWedding, params));
			}
		})
		.catch((err) => dispatch(createGuestFailure(err)));
};

export const updateGuest = (
	idWedding: number,
	idGuest: number,
	body: UpdateGuestRequest,
	params?: IPageQueryParams
): AppThunk => async (dispatch) => {
	dispatch(updateGuestStart());
	agent.Guests.updateGuest(idWedding, idGuest, body)
		.then((res) => {
			dispatch(updateGuestSuccess());
			if (params) {
				dispatch(getGuests(idWedding, params));
			}
		})
		.catch((err) => dispatch(updateGuestFailure(err)));
};

export const deleteGuest = (idWedding: number, idGuest: number, params?: IPageQueryParams): AppThunk => async (
	dispatch
) => {
	dispatch(deleteGuestStart());
	agent.Guests.deleteGuest(idWedding, idGuest)
		.then((res) => {
			dispatch(deleteGuestSuccess());
			if (params) {
				dispatch(getGuests(idWedding, params));
			}
		})
		.catch((err) => dispatch(deleteGuestFailure(err)));
};

export const getGuestTypes = (): AppThunk => async (dispatch) => {
	dispatch(getGuestTypesStart());
	agent.GuestTypes.getGuestTypes()
		.then((res) => dispatch(getGuestTypesSuccess(res)))
		.catch((err) => dispatch(getGuestTypesFailure(err)));
};

export const createGuestType = (body: CreateGuestTypeRequest): AppThunk => async (dispatch) => {
	dispatch(createGuestTypeStart());
	agent.GuestTypes.createGuestType(body)
		.then((res) => dispatch(createGuestTypeSuccess()))
		.catch((err) => dispatch(createGuestTypeFailure(err)));
};

export const updateGuestType = (idGuestType: number, body: UpdateGuestTypeRequest): AppThunk => async (dispatch) => {
	dispatch(updateGuestTypeStart());
	agent.GuestTypes.updateGuestType(idGuestType, body)
		.then((res) => dispatch(updateGuestTypeSuccess()))
		.catch((err) => dispatch(updateGuestTypeFailure(err)));
};
