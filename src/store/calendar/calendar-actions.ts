import { createAction } from "@reduxjs/toolkit";

export const changeSettingVisibility = createAction<{position: string, margin: string}>('calendar/openSettings');
