import { testHeader } from '../../mocks/test-header';
import { Calendar } from '../calendar/calendar';
import { Header } from '../header/header';

export function App() {
  return (
    <div>
      <Header user={testHeader.user} dateFrom={testHeader.dateFrom} dateTo={testHeader.dateTo}/>
      <Calendar/>
    </div>
  );
}
