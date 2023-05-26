import { CalendarDaySetting } from "./calendar-day-setting/calendar-day-setting";
import { CalendarList } from "./calendar-list/calendar-list";

export function Calendar(): JSX.Element {
  return (
    <>
      <CalendarList/>
      <CalendarDaySetting/>
    </>
  );
}