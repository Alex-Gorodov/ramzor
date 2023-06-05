import { StatusesValues } from "../const";
import { DayCard } from "../types/day-card";

const defaultCard: Omit<DayCard, 'date' | 'id'> = {
  status: StatusesValues.Available
}

const notAvailableCard: Omit<DayCard, 'date' | 'id'> = {
  ...defaultCard,
  status: StatusesValues.Disabled
}

const lockedCard: Omit<DayCard, 'date' | 'id'> = {
  ...defaultCard,
  status: StatusesValues.Locked
}

export const DISABLED_DAYS = 3;

const getData = (cardsCount: number): DayCard[] => {
  return [...Array(cardsCount)].map((_, index) => {
    // создаем массив, каждый элемент которого принимает 2 аргумета, первый из которых нам не важен
    let card;

    const isIncluded = index >= DISABLED_DAYS && index < cardsCount - DISABLED_DAYS;
    const isLocked = index === DISABLED_DAYS || index === cardsCount - DISABLED_DAYS - 1;

    if (isLocked) {
      card = lockedCard;
    } else if (isIncluded) {
      card = defaultCard;
    } else {
      card = notAvailableCard;
    }
    
    return {
      ...card,
      id: index,
      date: new Date(2023, 5, index + 5 - DISABLED_DAYS)
    }
  })
}

export const calendar: DayCard[] = getData(30);
