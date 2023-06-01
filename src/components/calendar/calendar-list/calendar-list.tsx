import { useDispatch, useSelector } from 'react-redux';
import { SETTER_STATE, STATUSES } from '../../../const';
import { calendar } from '../../../mocks/calendar';
import { DayCardItem } from '../../calendar/day-card-item/day-card-item';
import { CalendarDaySetting } from '../calendar-day-setting/calendar-day-setting';
import { RootState } from '../../../store/RootState';
import { selectCard } from '../../../store/calendar/calendar-actions';
import '../calendar.sass';

export function CalendarList(): JSX.Element {
  const margin = useSelector((state: RootState) => state.calendar.margin);
  const newStatus = useSelector((state: RootState) => state.calendar.selectedCardId ? state.calendar.calendar[state.calendar.selectedCardId].status : STATUSES[1]);
  const selectedCardId = useSelector((state: RootState) => state.calendar.selectedCardId);
  const dispatch = useDispatch();
  
  const handleCardClick = (cardId: number) => {
    dispatch(selectCard({ cardId, isSelected: true }));
  };

  return (
    <>
      <ul className="calendar">
        {calendar.map((day) => {
          return (
            <li key={day.id} className='calendar__item'>
              <DayCardItem 
                day={day}
                daySetting={{
                  id: day.id,
                  setting: SETTER_STATE[0]
                }}
                newStatus={newStatus}
                onClick={() => handleCardClick(day.id)}
              />
            </li>
          );
        })}
      </ul>
      <button className="calendar__submit-btn" style={{ marginBottom: `${margin}` }}>שלח לאישור הממונה</button>
      <CalendarDaySetting cardId={selectedCardId} />
    </>
  );
}