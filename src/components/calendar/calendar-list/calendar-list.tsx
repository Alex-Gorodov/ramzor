import { calendar } from '../../../mocks/calendar';
import { DayCardItem } from '../../calendar/day-card-item/day-card-item';
import '../calendar.sass'

export function CalendarList() {
  return (
    <ul className="calendar">
      {calendar.map((day) => (
        <li key={day.id} className='calendar__item'>
          <DayCardItem day={
            calendar[day.id]
          } />
        </li>
      ))}
    </ul>
  );
}
