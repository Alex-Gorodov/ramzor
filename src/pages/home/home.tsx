import { Calendar } from "../../components/calendar/calendar";
import { Header } from "../../components/header/header";
import { testHeader } from "../../mocks/test-header";

export function Home(): JSX.Element {
  
  return (
    <div>
      <Header user={testHeader.user} dateFrom={testHeader.dateFrom} dateTo={testHeader.dateTo}/>
      <Calendar/>
    </div>
  )
}