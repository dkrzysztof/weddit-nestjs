import { combineReducers } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import adminUsersSlice from './admin/users/users.slice';
import beveragesSlice from './beverages/beverages.slice';
import guestsSlice from './guests/guests.slice';
import { registerSlice } from './public/register/register.slice';

import sessionSlice from './session/session.slice';
import tasksSlice from './tasks/tasks.slice';
import { weddingSlice } from './weddings/weddings.slice';

const rootReducer = combineReducers({
	admin: combineReducers({
		users: adminUsersSlice.reducer
	}),
	session: sessionSlice.reducer,
	public: combineReducers({
		register: registerSlice.reducer
	}),
	weddings: weddingSlice.reducer,
	guests: guestsSlice.reducer,
	beverages: beveragesSlice.reducer,
	tasks: tasksSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
