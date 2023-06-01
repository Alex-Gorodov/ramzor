import { createAction } from "@reduxjs/toolkit";
import { CardStatus } from "../../types/day-card";

export const changeSettingVisibility = createAction<{cardId: number, position: string, margin: string}>('calendar/changeSettingVisibility');

export const changeSettingStatus = createAction<{settingStatus: CardStatus}>('calendar/changeSettingStatus');

export const setCardStatus = createAction<{cardId: number, cardStatus: CardStatus}>('calendar/setCardStatus');

export const selectCard = createAction<{cardId: number, isSelected: boolean}>('calendar/selectCard');

export const removeSelect = createAction<{cardStatus: CardStatus, cardId: number}>('calendar/removeSelect');
