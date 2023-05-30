import { createAction } from "@reduxjs/toolkit";
import { CardStatus, DayCard } from "../../types/day-card";

export const setNewStatus = createAction<{status: CardStatus}>('calendar/getStatus');

export const changeSettingVisibility = createAction<{cardId: number, position: string, margin: string}>('calendar/openSettings');

export const changeCardStatus = createAction<{cardId: number, cardStatus: CardStatus}>('calendar/dayStatus');

export const selectCard = createAction<{cardId: number, isSelected: boolean}>('calendar/selectCard');

export const removeSelect = createAction<{cardStatus: CardStatus, cardId: number}>('calendar/removeSelect');

export const updateCalendar = createAction<{ cardId: number, updatedCard: DayCard }>('calendar/updateCalendar');