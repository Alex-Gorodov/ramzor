import { DAY_SETTING } from "../../const";
import { CalendarState } from "../../types/state";
import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import { changeSettingVisibility } from "./calendar-actions";
import { ReducerWithInitialState } from "@reduxjs/toolkit/dist/createReducer";


const initialState: CalendarState = {
  position: DAY_SETTING[0].position,
  margin: DAY_SETTING[0].margin,
};

export const calendarReducer: ReducerWithInitialState<CalendarState> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<CalendarState>): void => {
    builder
      .addCase(changeSettingVisibility, (state, action) => {
        const { position, margin } = action.payload;
        state.position = position;
        state.margin = margin;
      })
  }
)