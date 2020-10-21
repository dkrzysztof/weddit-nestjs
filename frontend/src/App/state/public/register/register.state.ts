import { GetUserResponse } from 'App/api/admin/responses';
import { UserForGetUsersResponse } from 'App/api/admin/responses/getUsersResponse';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { GetUsersRequest } from 'App/api/admin/requests';
import { StatusType } from 'App/types/requestStatus';

const { INITIAL } = StatusType;

export interface RegisterState {
	status: {
		registerUser: StatusType;
	};
	error: string[];
}

export const registerInitialState: RegisterState = {
	status: {
		registerUser: INITIAL
	},
	error: null
};
