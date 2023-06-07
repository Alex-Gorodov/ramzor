import { CalendarDaySetting } from "../../components/calendar/calendar-day-setting/calendar-day-setting";
import { CalendarList } from "../../components/calendar/calendar-list/calendar-list";
import { Header } from "../../components/header/header";

export function HomePage(): JSX.Element {
  
  return (
    <div>
      <Header />
      <CalendarList />
      <CalendarDaySetting />
    </div>
  )
}