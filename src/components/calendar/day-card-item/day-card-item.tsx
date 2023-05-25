import { formatJewishDateInHebrew, toJewishDate } from "jewish-date";
import { DayCard } from "../../../types/day-card";
import { DAYS_OF_WEEK, MONTHS, STATUSES } from "../../../const";
import cn from 'classnames';
import '../calendar.sass';

type DayCardProps = {
  day: DayCard;
};

export function DayCardItem({day}: DayCardProps): JSX.Element {
    const wrapperClassName = cn('calendar__day-wrapper', {
      'calendar__day-wrapper--inactive': day.status.isIncluded === false,
    });
    return (
        <div className={wrapperClassName} style={{background: day.status.color}}>
          <p className="calendar__day">{day.date.getDate()}</p>
          <div className="calendar__inner-wrapper">
            <p>{DAYS_OF_WEEK[day.date.getDay()]}</p>
            <p>{MONTHS[day.date.getMonth()]}</p>
            <p>{day.date.getFullYear()}</p>
          </div>
          <span className="calendar__hebrew-date">{formatJewishDateInHebrew(toJewishDate(day.date))}</span>
          <button className="calendar__btn">
            <img className="calendar__availability-icon" src={day.status.icon} alt={day.status.value} />
          </button>
          <p className="calendar__extra">
            {
              day.status.value === STATUSES[4].value ? "נוכחות חובה" : ''
            }
            {
              day.status.value === STATUSES[2].value ? '10:20 - 17:30' : ''
            }
          </p>
        </div>
    );
};
