import { SETTER_STATE } from "../../const";
import { CalendarState } from "../../types/state";
import { createReducer } from "@reduxjs/toolkit";
import { changeSettingVisibility, clearSelect, setCardStatus, toggleSelect } from "./calendar-actions";
import { calendar } from "../../mocks/calendar";
import { enableMapSet } from 'immer'

enableMapSet()

const initialState: CalendarState = {
  calendar: calendar.map((card) => ({
    ...card,
    isSelected: false,
  })),
  selectedCardIds: new Set([]),
  position: SETTER_STATE[0].position, //TODO remove
  margin: SETTER_STATE[0].margin, //TODO remove
};

export const calendarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSettingVisibility, (state, action) => {
      const { position, margin } = action.payload;
      state.position = position;
      state.margin = margin;
    })

    .addCase(setCardStatus, (state, action) => {
      const {newStatus} = action.payload;
      const cardIds = state.selectedCardIds;
      state.calendar = state.calendar.map((card) => {
        if (cardIds.has(card.id)) {
          return { ...card, status: newStatus}
        }
        return card;
      })
    })
    
    .addCase(toggleSelect, (state, action) => {
      const { cardId } = action.payload;

      if (state.selectedCardIds.has(cardId)) {
        state.selectedCardIds.delete(cardId);
      } else {
        state.selectedCardIds.add(cardId);
      }
    })

    .addCase(clearSelect, (state) => {
      state.selectedCardIds = new Set([]);
      state.margin = SETTER_STATE[0].margin;
      state.position = SETTER_STATE[0].position;
    })
});
