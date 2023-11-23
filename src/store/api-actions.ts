import { AxiosInstance } from "axios";
import { AppDispatch, State } from "../types/state";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DayCard } from "../types/day-card";
import { setCardStatus } from "./calendar/calendar-actions";

type ThunkOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const setDayAction = createAsyncThunk <void, DayCard, ThunkOptions> (
  'calendar/day', async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.put<DayCard>('api/calendar/:id');
    dispatch(setCardStatus({
      ...data,
      newStatus: data.status,
      hourFrom: data.hourFrom,
      hourTo: data.hourTo,
    }));
  }
)

// export const loginAction = createAsyncThunk<
// void,
// AuthData,
// ThunkOptions>
// (
//   'user/login',
//   async ({ id: token }, { dispatch, extra: api }) => {
//     const { data } = await api.post<UserAuthData>(APIRoute.Login, {
//       token
//     });
//     saveToken(data.token);
//     dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth}));
//     dispatch(redirectToRoute(AppRoute.Root));
//     dispatch(getUserInformation({userInformation: data}));
//     dispatch(setUserInformation({userInformation: data}));
//   }
// );
