import {
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
} from './users.slice';
import { GetUsersRequest, CreateUserRequest, UpdateUserRequest } from 'App/api/admin/requests';
import { AppThunk } from 'App/state/store';
import agent from 'App/api/agent';

export const getUsers = (params: GetUsersRequest): AppThunk => async (dispatch) => {
	dispatch(getUsersStart());
	agent.Admin.getUsers(params)
		.then((response) => dispatch(getUsersSuccess(response)))
		.catch((error) => dispatch(getUsersFailure(error)));
};

export const getUser = (userId: number): AppThunk => async (dispatch) => {
	dispatch(getUserStart());
	agent.Admin.getUser(userId)
		.then((response) => dispatch(getUserSuccess(response)))
		.catch((error) => dispatch(getUserFailure(error)));
};

export const deleteUser = (userId: number, params: GetUsersRequest): AppThunk => async (dispatch) => {
	dispatch(deleteUserStart());
	agent.Admin.deleteUser(userId)
		.then(() => {
			dispatch(deleteUserSuccess(userId));
			dispatch(getUsers(params));
		})
		.catch((error) => dispatch(deleteUserFailure(error)));
};

export const createUser = (userToCreate: CreateUserRequest): AppThunk => async (dispatch) => {
	dispatch(createUserStart());
	agent.Admin.createUser(userToCreate)
		.then(() => dispatch(createUserSuccess()))
		.catch((error) => dispatch(createUserFailure(error)));
};

export const updateUser = (userId: number, userToUpdate: UpdateUserRequest): AppThunk => async (dispatch) => {
	dispatch(updateUserStart());
	agent.Admin.updateUser(userId, userToUpdate)
		.then((res) => dispatch(updateUserSuccess(res)))
		.catch((error) => dispatch(updateUserFailure(error)));
};

export const cleanUpUserStatus = (): AppThunk => async (dispatch) => {
	dispatch(cleanUpUserStatusStart());
};
