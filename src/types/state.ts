import { store } from "../store";
import { DayCard } from "./day-card";

export type AppDispatch = typeof store.dispatch;

export type DataState = {
  calendar: DayCard[],
  daySetting: { position: string, margin: string, hourFrom: string, hourTo: string};
}

export type CalendarState = {
  position: string;
  margin: string;
};