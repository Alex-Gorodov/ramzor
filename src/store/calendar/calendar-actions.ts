import { createAction } from "@reduxjs/toolkit";
import { CardStatus } from "../../types/day-card";

export const changeSettingVisibility = createAction<{position: string, margin: string}>('calendar/openSettings');

export const changeCardStatus = createAction<{cardStatus: CardStatus}>('calendar/dayStatus');