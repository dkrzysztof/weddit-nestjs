import { requests } from '../agent';
import { GetUsersRequest, UpdateUserRequest, CreateUserRequest } from './requests';
import { GetUserResponse, CreateUserResponse, GetUsersResponse, UpdateUserResponse } from './responses';
import { HttpStatusCodeResponse } from 'App/types/httpResponse.d';

import appConfig from 'app.config';

const { urlToIncludeInEmail } = appConfig;

export const AdminApi = {
	getUsers: (params: GetUsersRequest): Promise<GetUsersResponse> => requests.get(`/admin/users`, params),

	getUser: (userId: number): Promise<GetUserResponse> => requests.get(`/admin/users/${userId}`),

	createUser: (body: CreateUserRequest): Promise<CreateUserResponse> =>
		requests.post(`/admin/users`, { ...body, urlToIncludeInEmail }),

	updateUser: (userId: number, body: UpdateUserRequest): Promise<UpdateUserResponse> =>
		requests.put(`/admin/users/${userId}`, body),

	deleteUser: (userId: number): Promise<HttpStatusCodeResponse> => requests.delete(`/admin/users/${userId}`)
};
