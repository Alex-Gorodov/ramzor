import { formatJewishDateInHebrew, toJewishDate } from "jewish-date";
import { CardStatus, DayCard } from "../../../types/day-card";
import { DAYS_OF_WEEK, SETTER_STATE, MONTHS, STATUSES } from "../../../const";
import { DaySetting } from "../../../types/day-setting";
import { useDispatch, useSelector } from "react-redux";
import { changeSettingVisibility, removeSelect, selectCard } from "../../../store/calendar/calendar-actions";
import cn from 'classnames';
import '../calendar.sass';
import { RootState } from "../../../store/RootState";

type DayCardProps = {
  day: DayCard;
  daySetting: DaySetting;
  newStatus: CardStatus;
  onClick: () => void;
};

export function DayCardItem({day, daySetting, newStatus}: DayCardProps): JSX.Element {
  const isSelected = useSelector((state: RootState) => 
    state.calendar.calendar.find((card) => card.id === day.id)?.isSelected
  );

  const wrapperClassName = cn('calendar__day-wrapper', {
    'calendar__day-wrapper--inactive' : !day.isIncluded,
    'calendar__day-wrapper--selected' : isSelected,
    'calendar__day-wrapper--partly-in' : daySetting.setting.hourFrom,
    'calendar__day-wrapper--partly-out' : daySetting.setting.hourTo,
  });

  function isСhangeable(day: DayCard) {
    return day.isIncluded !== false && day.status.value !== STATUSES[4].value;
  }

  const dispatch = useDispatch();

  const handleCardButtonClick = () => {
    dispatch(changeSettingVisibility({cardId: day.id, position: SETTER_STATE[1].position, margin: SETTER_STATE[1].margin}));
    dispatch(selectCard({cardId: day.id, isSelected: true}));
    if (day.status === STATUSES[3]) dispatch(removeSelect({cardId: day.id, cardStatus: STATUSES[3]}));
  };

  return (
      <div className={wrapperClassName} style={isСhangeable(day) ? {background: newStatus.color} : {background: day.status.color}}>
        <p className="calendar__day">{day.date.getDate()}</p>
        <div className="calendar__inner-wrapper">
          <p>{DAYS_OF_WEEK[day.date.getDay()]}</p>
          <p>{MONTHS[day.date.getMonth()]}</p>
          <p>{day.date.getFullYear()}</p>
        </div>
        <span className="calendar__hebrew-date">{formatJewishDateInHebrew(toJewishDate(day.date))}</span>
        <button className="calendar__btn" data-btn-type={ isСhangeable(day) ? newStatus.value : day.status.value} onClick={handleCardButtonClick}>
        <img className="calendar__availability-icon" 
          src={isСhangeable(day) ? newStatus.icon : day.status.icon} 
          alt={isСhangeable(day) ? newStatus.value : STATUSES[0].value} />
        </button>
        <p className="calendar__extra">
          {
            !isСhangeable(day) && day.status.value === STATUSES[4].value ? "נוכחות חובה" : ''
          }
          {
            daySetting.setting.hourTo && daySetting.setting.hourFrom
              ? `${daySetting.setting.hourTo} - ${daySetting.setting.hourFrom}` 
              : !daySetting.setting.hourTo && daySetting.setting.hourFrom

                ? `${daySetting.setting.hourTo ? daySetting.setting.hourTo : 'הגעה ' + daySetting.setting.hourFrom}`
                : daySetting.setting.hourTo && !daySetting.setting.hourFrom

                  ? `${daySetting.setting.hourFrom ? daySetting.setting.hourFrom : 'יציאה ' + daySetting.setting.hourTo}`
                  : ''
          }
          {
          }
        </p>
      </div>
  );
};