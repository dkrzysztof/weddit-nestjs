import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';

import StatusType from 'App/types/requestStatus';
import { registerInitialState, RegisterState } from './register.state';

const { FAILED, LOADING, SUCCESS } = StatusType;

export const registerSlice = createSlice({
	name: 'register',
	initialState: registerInitialState,
	reducers: {
		registerStart: (state: RegisterState) => {
			state.status.registerUser = LOADING;
		},
		registerSuccess: (state: RegisterState) => {
			state.status.registerUser = SUCCESS;
			notification.success({
				message: 'Pomyślnie utworzono konto!'
			});
		},
		registerFailed: (state: RegisterState, action: PayloadAction<{ statusCode: number; message: string }>) => {
			state.status.registerUser = FAILED;
			notification.error({
				message: action.payload.message
			});
		}
	}
});

export const { registerStart, registerSuccess, registerFailed } = registerSlice.actions;
