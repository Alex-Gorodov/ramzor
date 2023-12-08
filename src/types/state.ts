import { StatusesValues } from "../const";
import { DayCard } from "./day-card";
import { Mission } from "./mission";
import { store } from "../store";
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
  isFormOpened: boolean;
  isSoldiersListOpened: boolean;
  missions: Mission[];
  users: User[];
  date: Date;
}
