export type CardStatus = {
  icon: string;
  value: string;
  color: string;
  hourFrom?: string;
  hourTo?: string;
}

export type DayCard = {
  id: number;
  isIncluded: boolean;
  date: Date;
  isSelected: boolean;
  status: CardStatus;
}
