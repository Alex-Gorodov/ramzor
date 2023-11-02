import { createReducer } from "@reduxjs/toolkit";
import { AdminTableState } from "../../types/state";
import { changeDateDown, changeDateUp } from "./admin-actions";

const initialState: AdminTableState = {
  date: new Date()
}

export const adminTableReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(changeDateDown, (state, action) => {
    const {date} = action.payload;
    const newDate = state.date.setDate(date.getDate() - 1);
    state.date = new Date(newDate);
  })
  .addCase(changeDateUp, (state, action) => {
    const {date} = action.payload;
    const newDate = state.date.setDate(date.getDate() + 1);
    state.date = new Date(newDate);
  })
})
