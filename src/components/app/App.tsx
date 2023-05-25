import { testHeader } from '../../mocks/test-header';
import { CalendarList } from '../calendar/calendar-list/calendar-list';
import { Header } from '../header/header';

export function App() {
  return (
    <div>
      <Header user={testHeader.user} dateFrom={testHeader.dateFrom} dateTo={testHeader.dateTo}/>
      <CalendarList/>
    </div>
  );
}
