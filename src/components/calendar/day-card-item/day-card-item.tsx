import { formatJewishDateInHebrew, toJewishDate } from "jewish-date";
import { DayCard } from "../../../types/day-card";
import { DAYS_OF_WEEK, DAY_SETTING, MONTHS, STATUSES } from "../../../const";
import { DaySetting } from "../../../types/day-setting";
import { useDispatch, useSelector } from "react-redux";
import { changeSettingVisibility, selectCard } from "../../../store/calendar/calendar-actions";
import cn from 'classnames';
import '../calendar.sass';
import { RootState } from "../../../store/RootState";
import { useState } from "react";

type DayCardProps = {
  day: DayCard;
  daySetting: DaySetting;
  onClick: () => void;
};

export function DayCardItem({day, daySetting}: DayCardProps): JSX.Element {
  const [isSelected, setIsSelected] = useState(false);

  const wrapperClassName = cn('calendar__day-wrapper', {
    'calendar__day-wrapper--inactive': day.status.isIncluded === false,
    'calendar__day-wrapper--selected': isSelected === true,
  });

  function isСhangeable(day: DayCard) {
    return day.status.isIncluded !== false && day.status.value !== STATUSES[4].value;
  }

  const dispatch = useDispatch();
  const handleCardButtonClick = () => {
    dispatch(changeSettingVisibility({cardId: day.id, position: DAY_SETTING[1].position, margin: DAY_SETTING[1].margin}));
    dispatch(selectCard(day.id));
    setIsSelected(!isSelected);
  };
  const newStatus = useSelector((state: RootState) => state.calendar.cardStatus)

  //TODO opacity and z-index

  return (
      <div className={wrapperClassName} style={isСhangeable(day) ? {background: newStatus.color} : {background: day.status.color}}>
        <p className="calendar__day">{day.date.getDate()}</p>
        <div className="calendar__inner-wrapper">
          <p>{DAYS_OF_WEEK[day.date.getDay()]}</p>
          <p>{MONTHS[day.date.getMonth()]}</p>
          <p>{day.date.getFullYear()}</p>
        </div>
        <span className="calendar__hebrew-date">{formatJewishDateInHebrew(toJewishDate(day.date))}</span>
        <button className="calendar__btn" data-btn-type={newStatus.value} onClick={handleCardButtonClick}>
          <img className="calendar__availability-icon" src={isСhangeable(day) ? newStatus.icon : day.status.icon} alt={isСhangeable(day) ? newStatus.value : STATUSES[0].value} />
        </button>
        <p className="calendar__extra">
          {
            !isСhangeable(day) && newStatus.value === STATUSES[4].value ? "נוכחות חובה" : STATUSES[0].value
          }
          {
            isСhangeable(day) && newStatus.value === STATUSES[2].value ? `${daySetting.setting.hourTo} - ${daySetting.setting.hourFrom}` : day.status.value
          }
        </p>
      </div>
  );
};
