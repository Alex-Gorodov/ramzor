import { useDispatch, useSelector } from 'react-redux';
import { DayCardItem } from '../../calendar/day-card-item/day-card-item';
import { RootState } from '../../../store/RootState';
import { toggleSelect } from '../../../store/calendar/calendar-actions';
import '../calendar.sass';

export function CalendarList(): JSX.Element {
  const calendar = useSelector((state: RootState) => state.calendar.calendar)
  const margin = useSelector((state: RootState) => state.calendar.margin);
  const dispatch = useDispatch();
  
  const handleCardClick = (cardId: number) => {
    dispatch(toggleSelect({ cardId }));
  };

  return (
    <>
      <ul className="calendar">
        {calendar.map((day) => {
          return (
            <li key={day.id} className='calendar__item'>
              <DayCardItem 
                day={day}
                onClick={() => handleCardClick(day.id)}
              />
            </li>
          );
        })}
      </ul>
      <button className="calendar__submit-btn" style={{ marginBottom: `${margin}` }}>שלח לאישור הממונה</button>
    </>
  );
}