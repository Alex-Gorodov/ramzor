import { createAction } from "@reduxjs/toolkit";
import { AppRoute } from "../../const";
import { User } from "../../types/user";

export const setUserInformation = createAction<{userInformation: User | undefined}>('user/setUserInformation');

export const redirectToRoute = createAction<AppRoute>('page/redirectToRoute');
