import { combineReducers } from '@reduxjs/toolkit';

import adminUsersSlice from './admin/users/users.slice';
import { registerSlice } from './public/register/register.slice';

import sessionSlice from './session/session.slice';

const rootReducer = combineReducers({
	admin: combineReducers({
		users: adminUsersSlice.reducer
	}),
	session: sessionSlice.reducer,
	public: combineReducers({
		register: registerSlice.reducer
	})
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
