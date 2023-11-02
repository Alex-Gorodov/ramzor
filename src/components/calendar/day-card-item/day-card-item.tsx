import { formatJewishDateInHebrew, toJewishDate } from "jewish-date";
import { DayCard } from "../../../types/day-card";
import { DAYS_OF_WEEK, SETTER_STATE, MONTHS, StatusesValues } from "../../../const";
import { useDispatch, useSelector } from "react-redux";
import { changeSettingVisibility, setActiveButton, toggleSelect } from "../../../store/calendar/calendar-actions";
import { RootState } from "../../../store/RootState";
import { clearSelect } from "../../../store/calendar/calendar-actions";
import { getCardColor, isEditable, renderImage } from "../../../utils";
import cn from 'classnames';
import '../calendar.sass';

type DayCardProps = {
  day: DayCard;
  onClick: () => void;
};

export function DayCardItem({ day }: DayCardProps): JSX.Element {
  const dispatch = useDispatch();

  const isSelected = useSelector((state: RootState) =>
    state.calendar.selectedCardIds.has(day.id)
  );

  const hasSelected = useSelector((state: RootState) =>
    state.calendar.selectedCardIds.size !== 0
  );

  const wrapperClassName = cn('calendar__day-wrapper', {
    'calendar__day-wrapper--inactive': day.status === StatusesValues.Disabled,
    'calendar__day-wrapper--selected': isSelected,
    'calendar__day-wrapper--partly': day.hourFrom && day.hourTo,
    'calendar__day-wrapper--partly-in': day.hourFrom && !day.hourTo,
    'calendar__day-wrapper--partly-out': day.hourTo && !day.hourFrom,
    'calendar__day-wrapper--partly-in-out': day.hourFrom && day.hourTo && day.hourTo > day.hourFrom
  });

  const handleCardButtonClick = () => {
    hasSelected && dispatch(changeSettingVisibility({ position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
    !hasSelected && dispatch(changeSettingVisibility({ position: SETTER_STATE[1].position, margin: SETTER_STATE[1].margin }));
    hasSelected && !isSelected && dispatch(clearSelect()) && dispatch(changeSettingVisibility({ position: SETTER_STATE[1].position, margin: SETTER_STATE[1].margin }));
    (day.hourFrom || day.hourTo) && dispatch(changeSettingVisibility({ position: SETTER_STATE[2].position, margin: SETTER_STATE[2].margin }));
    isSelected && hasSelected && (day.hourFrom || day.hourTo) && dispatch(changeSettingVisibility({ position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
    dispatch(toggleSelect({ cardId: day.id }));
    dispatch(setActiveButton({ activeButton: day.status }));
  };

  return (
    <div className={wrapperClassName} style={{ background: getCardColor(day.status) }} onClick={handleCardButtonClick}>
      <p className="calendar__day">{day.date.getDate() < 10 ? '0' + day.date.getDate() : day.date.getDate()}</p>

      <div className="calendar__inner-wrapper">
        <p>{DAYS_OF_WEEK[day.date.getDay()]}</p>
        <p>{MONTHS[day.date.getMonth()]}</p>
        <p>{day.date.getFullYear()}</p>
      </div>

      <span className="calendar__hebrew-date">{formatJewishDateInHebrew(toJewishDate(day.date))}</span>

      <button className="calendar__btn" data-btn-type={isEditable(day) ? day.status : day.status}>
        <img className="calendar__availability-icon"
          src={renderImage(day.status)}
          alt={isEditable(day) ? day.status : ''}
        />
      </button>
      <p className="calendar__extra">
        {
          day.status === StatusesValues.Locked ? "נוכחות חובה" : ''
        }
        {
          day.hourTo && day.hourFrom
            ? `${day.hourFrom > day.hourTo ? `${day.hourFrom} - ${day.hourTo}` : `${'הגעה ' + day.hourFrom} ${'יציאה ' + day.hourTo}`}`
            : !day.hourTo && day.hourFrom

              ? `${day.hourTo ? day.hourTo : 'הגעה ' + day.hourFrom}`
              : day.hourTo && !day.hourFrom

                ? `${day.hourFrom ? day.hourFrom : 'יציאה ' + day.hourTo}`
                : ''
        }
      </p>
    </div>
  );
};
