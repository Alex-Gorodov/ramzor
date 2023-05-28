import { formatJewishDateInHebrew, toJewishDate } from "jewish-date";
import { DayCard } from "../../../types/day-card";
import { DAYS_OF_WEEK, DAY_SETTING, MONTHS, STATUSES } from "../../../const";
import { DaySetting } from "../../../types/day-setting";
import { useDispatch, useSelector } from "react-redux";
import { changeSettingVisibility } from "../../../store/calendar/calendar-actions";
import cn from 'classnames';
import '../calendar.sass';
import { RootState } from "../../../store/RootState";

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
  const newStatus = useSelector((state: RootState) => state.calendar.cardStatus)

  return (
      <div className={wrapperClassName} style={day.status.isIncluded !== false ? {background: newStatus.color} : {background: STATUSES[0].color}}>
        <p className="calendar__day">{day.date.getDate()}</p>
        <div className="calendar__inner-wrapper">
          <p>{DAYS_OF_WEEK[day.date.getDay()]}</p>
          <p>{MONTHS[day.date.getMonth()]}</p>
          <p>{day.date.getFullYear()}</p>
        </div>
        <span className="calendar__hebrew-date">{formatJewishDateInHebrew(toJewishDate(day.date))}</span>
        <button className="calendar__btn" data-btn-type={newStatus.value} onClick={handleCardButtonClick}>
          <img className="calendar__availability-icon" src={day.status.isIncluded !== false ? newStatus.icon : STATUSES[0].icon} alt={day.status.isIncluded !== false ? newStatus.value : STATUSES[0].value} />
        </button>
        <p className="calendar__extra">
          {
            newStatus.value === STATUSES[4].value ? "נוכחות חובה" : STATUSES[0].value
          }
          {
            newStatus.value === STATUSES[2].value ? `${daySetting.setting.hourTo} - ${daySetting.setting.hourFrom}` : STATUSES[0].value
          }
        </p>
      </div>
  );
};
