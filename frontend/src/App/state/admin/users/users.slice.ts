import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetUserResponse, GetUsersResponse, UpdateUserResponse } from 'App/api/admin/responses';
import { StatusType } from 'App/types/requestStatus';
import { adminUsersInitialState, AdminUsersState } from './users.state';

const { FAILED, LOADING, SUCCESS } = StatusType;

export const adminUsersSlice = createSlice({
	name: 'admin-users',
	initialState: adminUsersInitialState,
	reducers: {
		getUsersStart: (state: AdminUsersState) => {
			state.status.getUsers = LOADING;
			state.error = null;
			state.users = [];
		},
		getUsersSuccess(state: AdminUsersState, action: PayloadAction<GetUsersResponse>) {
			state.status.getUsers = SUCCESS;
			const { data, ...params } = action.payload;
			state.users = data;
			state.getUsersParams = params;
			state.getUsersTotalPages = params.totalNumberOfItems;
		},
		getUsersFailure(state: AdminUsersState, action: PayloadAction<string[]>) {
			state.status.getUsers = FAILED;
			state.error = action.payload;
		},

		// ---

		getUserStart: (state: AdminUsersState) => {
			state.status.getUser = LOADING;
			state.error = null;
		},
		getUserSuccess: (state: AdminUsersState, action: PayloadAction<GetUserResponse>) => {
			state.status.getUser = SUCCESS;
			state.selectedUser = action.payload;
		},
		getUserFailure: (state: AdminUsersState, action: PayloadAction<string[]>) => {
			state.status.getUser = FAILED;
			state.error = action.payload;
		},

		// ---

		deleteUserStart: (state: AdminUsersState) => {
			state.status.deleteUser = LOADING;
			state.error = null;
		},
		deleteUserSuccess: (state: AdminUsersState, action: PayloadAction<number>) => {
			state.status.deleteUser = SUCCESS;
			state.users = state.users.filter((u) => u.idUser !== action.payload);
			state.status.getUsers = null;
		},
		deleteUserFailure: (state: AdminUsersState, action: PayloadAction<string[]>) => {
			state.status.deleteUser = FAILED;
			state.error = action.payload;
		},

		// ---

		createUserStart: (state: AdminUsersState) => {
			state.error = null;
			state.status.createUser = LOADING;
		},
		createUserSuccess: (state: AdminUsersState) => {
			state.status.createUser = SUCCESS;
		},
		createUserFailure: (state: AdminUsersState, action: PayloadAction<string[]>) => {
			state.status.createUser = FAILED;
			state.error = action.payload;
		},

		// ---

		updateUserStart: (state: AdminUsersState) => {
			state.status.updateUser = LOADING;
			state.error = null;
		},
		updateUserSuccess: (state: AdminUsersState, action: PayloadAction<UpdateUserResponse>) => {
			state.status.updateUser = SUCCESS;
			const user = state.users.find((u) => u.idUser === action.payload.idUser);

			if (user) {
				const { firstName, lastName, isAdmin } = action.payload;

				user.firstName = firstName;
				user.lastName = lastName;

				user.isAdmin = isAdmin;
			}
		},
		updateUserFailure: (state: AdminUsersState, action: PayloadAction<string[]>) => {
			state.status.updateUser = FAILED;
			state.error = action.payload;
		},

		// ---

		cleanUpUserStatusStart: (state: AdminUsersState) => {
			state.status = adminUsersInitialState.status;
			state.error = adminUsersInitialState.error;
		}
	}
});

export default adminUsersSlice;

export const {
	getUsersStart,
	getUsersSuccess,
	getUsersFailure,
	getUserStart,
	getUserSuccess,
	getUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
	createUserStart,
	createUserSuccess,
	createUserFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	cleanUpUserStatusStart
} = adminUsersSlice.actions;
