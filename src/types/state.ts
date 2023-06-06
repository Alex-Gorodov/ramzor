import { store } from "../store";
import { CardStatus, DayCard } from "./day-card";
import { UserAuthData } from "./user";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type DataState = {
  calendar: DayCard[],
  daySetting: { position: string, margin: string, hourFrom: string, hourTo: string};
}

export type CalendarState = {
  calendar: DayCard[];
  selectedCardIds: Set<number>; // массив с неповторяющимися элементами
  position: string;
  margin: string;
};

export type DayState = {
  day: Record<number, DayCard[]>;
  isIncluded: boolean;
  date: Date;
  daySetting: CardStatus;
}

export type AuthState = {
  userInfo: UserAuthData | undefined;
};
