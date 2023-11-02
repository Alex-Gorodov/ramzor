import { createAction } from "@reduxjs/toolkit";

export const changeDateUp = createAction<{date: Date}>('admin/changeDateUp');
export const changeDateDown = createAction<{date: Date}>('admin/changeDateDown');
