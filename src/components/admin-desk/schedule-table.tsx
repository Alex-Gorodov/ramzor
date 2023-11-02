import { changeDateDown, changeDateUp } from "../../store/admin/admin-actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/RootState";
import { missions } from "../../mocks/missions";
import { HOURS } from "../../const"
import './schedule.sass'

export function ScheduleTable(): JSX.Element {
  const dispatch = useDispatch();
  const newDate = useSelector((state: RootState) => state.admin.date)
  
  return (
    <>
      <div className="schedule__date">
        <button className="schedule__day-btn schedule__day-btn--prev" onClick={() => dispatch(changeDateDown({date: newDate}))}>&#8593;</button>
        <p>{newDate.getDate()}.{newDate.getMonth() + 1}</p>
        <button className="schedule__day-btn schedule__day-btn--next" onClick={() => dispatch(changeDateUp({date: newDate}))}>&#8595;</button>
      </div>
      <table className="schedule__table schedule-section">
      <tbody>
          <tr>
            <th></th>
            {
              missions.map((mission) => {
                return (
                  <th key={mission.name}>{mission.name}</th>
                )
              })
            }
          </tr>
          {HOURS.map((hour) => { 
            return (
              <tr className="schedule-hours hours__wrapper" key={`hour-${hour}`}>
                <td
                  className="schedule-hours__row"
                  key={`hour-${hour}`}
                >
                  {10 / hour > 1 ? '0' + hour : hour}:00
                  - 
                  {
                    10 / hour > 1 && hour !== 9 ? ` 0${hour + 1}`
                    : hour < 23 ? ` ${hour + 1}`
                    : ' 00'
                  }:00
                </td>
                {
                  missions.map((mission) => {
                    return (
                      <td
                        className="schedule-hours__cell"
                        data-mission-time={mission.length}
                        key={`${mission.name}-${hour}`}
                        title={`${mission.name} ${
                          10 / hour > 1
                          ?
                          '0' + hour
                          :
                          hour
                        }:00-${
                          10 / hour > 1 && hour !== 9
                          ?
                          `0${hour + 1}`
                          :
                          `${hour + 1}`
                        }:00`}
                      ></td>
                    )
                  })
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
