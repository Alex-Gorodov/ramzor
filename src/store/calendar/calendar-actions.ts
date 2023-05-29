import { createAction } from "@reduxjs/toolkit";
import { CardStatus } from "../../types/day-card";

export const changeSettingVisibility = createAction<{cardId: number, position: string, margin: string}>('calendar/openSettings');

export const changeCardStatus = createAction<{cardId: number, cardStatus: CardStatus}>('calendar/dayStatus');

export const selectCard = createAction<number | null>('calendar/selectCard');