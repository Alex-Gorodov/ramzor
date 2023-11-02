import { ScheduleTable } from './schedule-table';
import './schedule.sass'
import { UsersData } from "./users-data";

export function AdminDesk(): JSX.Element {
  return (
    <div className="schedule">
      <ScheduleTable/>
      <UsersData/>
    </div>
  );
}
