import { StatusesValues } from "../const";

export type CardStatus = 
  'available' | 'partly-available' | 'unavailable' | 'locked' | 'disabled'

export type DayCard = {
  id: number;
  isIncluded: boolean; //TODO remove it
  date: Date;
  // isSelected: boolean; //TODO remove it
  hourFrom?: string;
  hourTo?: string;
  status: StatusesValues;
}
