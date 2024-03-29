import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorApi } from 'App/api/agent';
import { GetGuestsResponse } from 'App/api/guests/responses';
import { GetGuestsShortCollectionResponse } from 'App/api/guests/responses/GetGuestsShortCollectionResponse';
import { GetGuestTypesResponse } from 'App/api/guestTypes/responses';
import StatusType from 'App/types/requestStatus';
import { GuestState, initialGuestState } from './guests.state';

const { FAILED, LOADING, SUCCESS } = StatusType;

const guestsSlice = createSlice({
	name: 'guests',
	initialState: initialGuestState,
	reducers: {
		getGuestsStart: (state: GuestState) => {
			state.status.getGuests = LOADING;
		},
		getGuestsSuccess: (state: GuestState, action: PayloadAction<GetGuestsResponse>) => {
			state.status.getGuests = SUCCESS;
			const { data, ...pageQuery } = action.payload;

			state.guests = data;
			state.guestsQueryParams = pageQuery;
		},
		getGuestsFailure: (state: GuestState, action: PayloadAction<ErrorApi>) => {
			state.status.getGuests = FAILED;
		},

		///

		createGuestStart: (state: GuestState) => {
			state.status.createGuest = LOADING;
		},
		createGuestSuccess: (state: GuestState) => {
			state.status.createGuest = SUCCESS;
		},
		createGuestFailure: (state: GuestState, action: PayloadAction<ErrorApi>) => {
			state.status.createGuest = FAILED;
		},

		///

		updateGuestStart: (state: GuestState) => {
			state.status.updateGuest = LOADING;
		},
		updateGuestSuccess: (state: GuestState) => {
			state.status.updateGuest = SUCCESS;
		},
		updateGuestFailure: (state: GuestState, action: PayloadAction<ErrorApi>) => {
			state.status.updateGuest = FAILED;
		},

		///

		deleteGuestStart: (state: GuestState) => {
			state.status.deleteGuest = LOADING;
		},
		deleteGuestSuccess: (state: GuestState) => {
			state.status.deleteGuest = SUCCESS;
		},
		deleteGuestFailure: (state: GuestState, action: PayloadAction<ErrorApi>) => {
			state.status.deleteGuest = FAILED;
		},

		///

		getGuestTypesStart: (state: GuestState) => {
			state.status.getGuestTypes = LOADING;
		},
		getGuestTypesSuccess: (state: GuestState, action: PayloadAction<GetGuestTypesResponse>) => {
			state.status.getGuestTypes = SUCCESS;
			state.guestTypes = action.payload;
		},
		getGuestTypesFailure: (state: GuestState, action: PayloadAction<ErrorApi>) => {
			state.status.getGuestTypes = FAILED;
		},

		///

		createGuestTypeStart: (state: GuestState) => {
			state.status.createGuestType = LOADING;
		},
		createGuestTypeSuccess: (state: GuestState) => {
			state.status.createGuestType = SUCCESS;
		},
		createGuestTypeFailure: (state: GuestState, action: PayloadAction<ErrorApi>) => {
			state.status.createGuestType = FAILED;
		},

		///

		updateGuestTypeStart: (state: GuestState) => {
			state.status.updateGuestType = LOADING;
		},
		updateGuestTypeSuccess: (state: GuestState) => {
			state.status.updateGuestType = SUCCESS;
		},
		updateGuestTypeFailure: (state: GuestState, action: PayloadAction<ErrorApi>) => {
			state.status.updateGuestType = FAILED;
		},

		///

		getGuestsShortCollectionStart: (state: GuestState) => {
			state.status.getGuestsShortCollection = LOADING;
		},
		getGuestsShortCollectionSuccess: (
			state: GuestState,
			action: PayloadAction<GetGuestsShortCollectionResponse[]>
		) => {
			state.status.getGuestsShortCollection = SUCCESS;

			state.guestsShort = action.payload;
		},
		getGuestsShortCollectionFailure: (state: GuestState, action: PayloadAction<ErrorApi>) => {
			state.status.getGuestsShortCollection = FAILED;
		}
	}
});

export const {
	createGuestFailure,
	createGuestStart,
	createGuestSuccess,
	deleteGuestFailure,
	deleteGuestStart,
	deleteGuestSuccess,
	getGuestsFailure,
	getGuestsStart,
	getGuestsSuccess,
	updateGuestFailure,
	updateGuestStart,
	updateGuestSuccess,
	createGuestTypeFailure,
	createGuestTypeStart,
	createGuestTypeSuccess,
	getGuestTypesFailure,
	getGuestTypesStart,
	getGuestTypesSuccess,
	updateGuestTypeFailure,
	updateGuestTypeStart,
	updateGuestTypeSuccess,
	getGuestsShortCollectionFailure,
	getGuestsShortCollectionStart,
	getGuestsShortCollectionSuccess
} = guestsSlice.actions;

export default guestsSlice;
