import { useSelector } from 'react-redux';
import { DAY_SETTING } from '../../../const';
import { calendar } from '../../../mocks/calendar';
import { DayCardItem } from '../../calendar/day-card-item/day-card-item';
import { CalendarDaySetting } from '../calendar-day-setting/calendar-day-setting';
import { RootState } from '../../../store/RootState';
import '../calendar.sass';

export function CalendarList(): JSX.Element {
  const margin = useSelector((state: RootState) => state.calendar.margin)

  return (
    <>
      <ul className="calendar">
        {calendar.map((day) => (
          <li key={day.id} className='calendar__item'>
            <DayCardItem 
              day={calendar[day.id]}
              daySetting={{
                id: day.id,
                date: day.date,
                setting: DAY_SETTING[0]
              }}
              />
          </li>
        ))}
      </ul>
      <button className="calendar__submit-btn" style={{ marginBottom: `${margin}` }}>שלח לאישור הממונה</button>
      <CalendarDaySetting />
    </>
  );
}
