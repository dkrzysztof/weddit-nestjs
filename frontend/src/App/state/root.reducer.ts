import { combineReducers } from '@reduxjs/toolkit';

import adminUsersSlice from './admin/users/users.slice';
import { registerSlice } from './public/register/register.slice';

import sessionSlice from './session/session.slice';
import { weddingSlice } from './weddings/weddings.slice';

const rootReducer = combineReducers({
	admin: combineReducers({
		users: adminUsersSlice.reducer
	}),
	session: sessionSlice.reducer,
	public: combineReducers({
		register: registerSlice.reducer
	}),
	weddings: weddingSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
