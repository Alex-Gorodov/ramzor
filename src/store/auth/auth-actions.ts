import { createAction } from "@reduxjs/toolkit";
import { AppRoute } from "../../const";
import { UserAuthData } from "../../types/user";

export const setUserInformation = createAction<{userInformation: UserAuthData | undefined}>('user/setUserInformation');

export const redirectToRoute = createAction<AppRoute>('page/redirectToRoute');
