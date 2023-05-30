export type CardStatus = {
  icon: string;
  value: string;
  color: string;
}

export type DayCard = {
  id: number;
  isIncluded: boolean;
  date: Date;
  isSelected: boolean;
  status: CardStatus;
}
