import { DAY_SETTING, STATUSES } from "../../const";
import { CalendarState } from "../../types/state";
import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import { changeCardStatus, changeSettingVisibility } from "./calendar-actions";
import { ReducerWithInitialState } from "@reduxjs/toolkit/dist/createReducer";


const initialState: CalendarState = {
  position: DAY_SETTING[0].position,
  margin: DAY_SETTING[0].margin,
  cardStatus: STATUSES[1],
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
      .addCase(changeCardStatus, (state, action) => {
        const { cardStatus } = action.payload;
        state.cardStatus = cardStatus;
      })
  }
)