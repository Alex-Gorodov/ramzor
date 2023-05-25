export type DayCard = {
  id: number;
  date: Date;
  status: {isIncluded: boolean, icon: string, value: string, color: string};
}
