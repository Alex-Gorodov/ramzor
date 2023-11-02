import { StatusesValues } from "../const";
import { store } from "../store";
import { DayCard } from "./day-card";
import { User } from "./user";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CalendarState = {
  calendar: DayCard[];
  selectedCardIds: Set<number>; // массив с неповторяющимися элементами
  activeButton: StatusesValues
  position: string;
  margin: string;
};

export type AuthState = {
  userInfo: User | undefined;
};

export type AdminTableState = {
  date: Date;
}
