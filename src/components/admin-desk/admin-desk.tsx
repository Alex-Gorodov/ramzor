import { ScheduleTable } from './schedule-table';
import { UsersData } from "./users-data";
import './schedule.sass'

export function AdminDesk(): JSX.Element {
  return (
    <div className="schedule">
      <ScheduleTable/>
      <UsersData/>
    </div>
  );
}
