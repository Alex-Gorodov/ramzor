import { combineReducers } from 'redux';
import { calendarReducer } from './calendar/calendar-reducers';
import { authReducer } from './auth/auth-reducer';

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
