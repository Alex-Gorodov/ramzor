import { combineReducers } from 'redux';
import { calendarReducer } from './calendar/calendar-reducers';
import { authReducer } from './auth/auth-reducer';
import { adminTableReducer } from './admin/admin-reducer';

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  auth: authReducer,
  admin: adminTableReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
