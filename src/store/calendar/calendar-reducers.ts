import { SETTER_STATE, STATUSES } from "../../const";
import { CalendarState } from "../../types/state";
import { createReducer } from "@reduxjs/toolkit";
import { changeCardStatus, changeSettingVisibility, removeSelect, selectCard } from "./calendar-actions";
import { calendar } from "../../mocks/calendar";

const initialState: CalendarState = {
  calendar: calendar.map((card) => ({
    ...card,
    isSelected: false,
  })),
  selectedCardId: null,
  position: SETTER_STATE[0].position,
  margin: SETTER_STATE[0].margin,
  cardStatus: STATUSES[1],
};

export const calendarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSettingVisibility, (state, action) => {
      const { cardId, position, margin } = action.payload;
      state.selectedCardId = cardId;
      state.position = position;
      state.margin = margin;
      state.calendar = state.calendar.map((card) =>
        card.id === cardId ? { ...card, isSelected: true } : card
      );
    })
    .addCase(changeCardStatus, (state, action) => {
      const { cardId, cardStatus } = action.payload;
      if (state.selectedCardId === cardId) {
        state.cardStatus = cardStatus;
      }
      state.calendar = state.calendar.map((card) =>
      card.id === cardId ? { ...card, isSelected: true } : card
      );
      state.calendar[cardId].status = cardStatus;
    })
    // .addCase(selectCard, (state, action) => {
    //   const { cardId, isSelected } = action.payload;
    //   if (isSelected) {
    //     state.selectedCardId = cardId;
    //   } else {
    //     state.selectedCardId = null;
    //   }
    //   state.calendar = state.calendar.map((card) =>
    //     card.id === cardId ? { ...card, isSelected } : card
    //   );
    // })
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
    .addCase(removeSelect, (state, action) => {
      const { cardId, cardStatus } = action.payload;
      state.selectedCardId = cardId;
      if (state.selectedCardId === cardId) {
        state.selectedCardId = null;
        state.cardStatus = cardStatus;
      }
      state.calendar = state.calendar.map((card) =>
        card.id === cardId ? { ...card, isSelected: false } : card
      );
    });
});
