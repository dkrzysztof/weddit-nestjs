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
