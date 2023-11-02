import { StatusesValues, StatusesColors } from "../const";
import availableIcon from '../img/icons/available.svg';
import partlyIcon from '../img/icons/clock.svg';
import unavailableIcon from '../img/icons/unavailable.svg';
import lockedIcon from '../img/icons/lock.svg'
import { DayCard } from "../types/day-card";

export const renderImage = (status: StatusesValues): string => {
  switch (status) {
    case StatusesValues.Available:
      return availableIcon;

    case StatusesValues.Partly:
      return partlyIcon;

    case StatusesValues.Unavailable:
      return unavailableIcon;

    case StatusesValues.Locked:
      return lockedIcon;

    default:
      return '';
  }
}

export const getCardColor = (status: StatusesValues): StatusesColors => {
  switch (status) {
    case StatusesValues.Available:
      return StatusesColors.Available;

    case StatusesValues.Partly:
      return StatusesColors.Partly;

    case StatusesValues.Unavailable:
      return StatusesColors.Unavailable;

    case StatusesValues.Locked:
      return StatusesColors.Locked;

    case StatusesValues.Disabled:
      return StatusesColors.Disabled;

    default:
      return StatusesColors.Available;
  }
}

export function isEditable(day: DayCard) {
  return day.status !== StatusesValues.Disabled && day.status !== StatusesValues.Locked;
}
