import { formatJewishDateInHebrew, toJewishDate } from "jewish-date";
import { DayCard } from "../../../types/day-card";
import { DAYS_OF_WEEK, DAY_SETTING, MONTHS, STATUSES } from "../../../const";
import cn from 'classnames';
import '../calendar.sass';
import { DaySetting } from "../../../types/day-setting";
import { useDispatch } from "react-redux";
import { changeSettingVisibility } from "../../../store/calendar/calendar-actions";

type DayCardProps = {
  day: DayCard;
  daySetting: DaySetting;
};

export function DayCardItem({day, daySetting}: DayCardProps): JSX.Element {
  const wrapperClassName = cn('calendar__day-wrapper', {
    'calendar__day-wrapper--inactive': day.status.isIncluded === false,
  });

  const dispatch = useDispatch();
  const handleCardButtonClick = () => {
    dispatch(changeSettingVisibility({position: DAY_SETTING[1].position, margin: DAY_SETTING[1].margin}));
  };

  return (
      <div className={wrapperClassName} style={{background: day.status.color}}>
        <p className="calendar__day">{day.date.getDate()}</p>
        <div className="calendar__inner-wrapper">
          <p>{DAYS_OF_WEEK[day.date.getDay()]}</p>
          <p>{MONTHS[day.date.getMonth()]}</p>
          <p>{day.date.getFullYear()}</p>
        </div>
        <span className="calendar__hebrew-date">{formatJewishDateInHebrew(toJewishDate(day.date))}</span>
        <button className="calendar__btn" data-btn-type={day.status.value} onClick={handleCardButtonClick}>
          <img className="calendar__availability-icon" src={day.status.icon} alt={day.status.value} />
        </button>
        <p className="calendar__extra">
          {
            day.status.value === STATUSES[4].value ? "נוכחות חובה" : ''
          }
          {
            day.status.value === STATUSES[2].value ? `${daySetting.setting.hourTo} - ${daySetting.setting.hourFrom}` : ''
          }
        </p>
      </div>
  );
};
