import agent from 'App/api/agent';
import { RegisterRequest } from 'App/api/auth/requests';
import { AppThunk } from 'App/state/store';
import { registerFailed, registerStart, registerSuccess } from './register.slice';

export const registerUser = (body: RegisterRequest): AppThunk => async (dispatch) => {
	dispatch(registerStart());
	agent.Auth.register(body)
		.then(() => dispatch(registerSuccess()))
		.catch((error) => dispatch(registerFailed(error.data)));
};
