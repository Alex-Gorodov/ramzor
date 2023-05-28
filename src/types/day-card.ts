export type CardStatus = {
  isIncluded: boolean;
  icon: string;
  value: string;
  color: string;
}

export type DayCard = {
  id: number;
  date: Date;
  status: CardStatus;
}
