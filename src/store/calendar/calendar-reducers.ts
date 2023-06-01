import { SETTER_STATE, STATUSES } from "../../const";
import { CalendarState } from "../../types/state";
import { createReducer } from "@reduxjs/toolkit";
import { setCardStatus, changeSettingVisibility, removeSelect, selectCard, changeSettingStatus } from "./calendar-actions";
import { calendar } from "../../mocks/calendar";

const initialState: CalendarState = {
  calendar: calendar.map((card) => ({
    ...card,
    isSelected: false,
    status: STATUSES[1],
  })),
  selectedCardId: null,
  position: SETTER_STATE[0].position,
  margin: SETTER_STATE[0].margin,
  settingStatus: STATUSES[1],
};

export const calendarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSettingVisibility, (state, action) => {
      const { cardId, position, margin } = action.payload;
      state.selectedCardId = cardId;
      state.position = position;
      state.margin = margin;
    })
    .addCase(changeSettingStatus, (state, action) => {
      const {settingStatus} = action.payload;
      state.settingStatus = settingStatus;
    })
    .addCase(selectCard, (state, action) => {
      const { cardId, isSelected } = action.payload;
      state.selectedCardId = cardId;
      state.calendar = state.calendar.map((card) => {
        if (card.id === cardId) {
          return { ...card, isSelected };
        }
        return card;
      });
    })
    .addCase(setCardStatus, (state, action) => {      
      const { cardId, cardStatus } = action.payload;
      state.settingStatus = cardStatus;      
      state.calendar[cardId].status = cardStatus;
    })
    .addCase(removeSelect, (state, action) => {
      const { cardId } = action.payload;
      state.calendar = state.calendar.map((card) =>
        card.id === cardId ? { ...card, isSelected: false } : card
      );
    });
});
