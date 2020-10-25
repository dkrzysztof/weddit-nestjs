import { GetUserResponse } from 'App/api/admin/responses';
import { UserForGetUsersResponse } from 'App/api/admin/responses/getUsersResponse';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { GetUsersRequest } from 'App/api/admin/requests';
import { StatusType } from 'App/types/requestStatus';
import { IPageQueryParams } from 'App/types/pagination/pagination';

const { INITIAL } = StatusType;

export interface AdminUsersState {
	status: {
		getUsers: StatusType;
		getUser: StatusType;
		deleteUser: StatusType;
		createUser: StatusType;
		updateUser: StatusType;
	};
	error: string[];
	users: UserForGetUsersResponse[];
	getUsersParams: IPageQueryParams;
	getUsersTotalPages: number;
	selectedUser: GetUserResponse | null;
}

export const adminUsersInitialState: AdminUsersState = {
	status: {
		getUsers: INITIAL,
		getUser: INITIAL,
		deleteUser: INITIAL,
		createUser: INITIAL,
		updateUser: INITIAL
	},
	error: null,
	users: [],
	getUsersParams: defaultPageQueryParams,
	selectedUser: null,
	getUsersTotalPages: 0
};
