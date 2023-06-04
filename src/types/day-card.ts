import { StatusesValues } from "../const";

export type CardStatus = 
  'available' | 'partly-available' | 'unavailable' | 'locked' | 'disabled'

export type DayCard = {
  id: number;
  date: Date;
  hourFrom?: string;
  hourTo?: string;
  status: StatusesValues;
}
