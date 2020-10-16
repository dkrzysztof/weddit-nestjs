import { GetAccountDetailsResponse } from 'App/api/account/responses';
import { LoginResponse } from 'App/api/auth/responses';
import { StatusType } from 'App/types/requestStatus';

const { INITIAL } = StatusType;

export interface SessionState {
	status: {
		authentication: StatusType;
		getUserDetails: StatusType;
		devalidateSession: StatusType;
		checkRoles: StatusType;
	};
	info: LoginResponse | null;
	isCorrectRole: boolean;
	error: string[];
	user: GetAccountDetailsResponse | null;
}

export const sessionInitialState: SessionState = {
	status: {
		authentication: INITIAL,
		getUserDetails: INITIAL,
		devalidateSession: INITIAL,
		checkRoles: INITIAL
	},
	isCorrectRole: false,
	info: null,
	error: null,
	user: null
};
