import { createAction } from "@reduxjs/toolkit";
import { StatusesValues } from "../../const";

export const changeSettingVisibility = createAction<{position: string, margin: string}>('calendar/changeSettingVisibility');

export const setCardStatus = createAction<{newStatus: StatusesValues, hourFrom?: string, hourTo?: string}>('calendar/setCardStatus');

export const toggleSelect = createAction<{cardId: number}>('calendar/toggleSelect');

export const clearSelect = createAction('calendar/clearSelect');
