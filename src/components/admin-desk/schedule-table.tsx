import { changeDateDown, changeDateUp } from "../../store/admin/admin-actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/RootState";
import { missions } from "../../mocks/missions";
import { DAYS_OF_WEEK, HOURS, MONTHS, SECONDS_PER_DAY } from "../../const"
import './schedule.sass'
import { toHebrewJewishDate, toJewishDate } from "jewish-date";

export function ScheduleTable(): JSX.Element {
  const dispatch = useDispatch();
  const newDate = useSelector((state: RootState) => state.admin.date)
  const currentTime = newDate.getHours()*60*60 + newDate.getMinutes()*60 + newDate.getSeconds();
  
  return (
    <>
      <div className="schedule-date__wrapper">
        <button className="schedule__day-btn schedule__day-btn--prev" onClick={() => dispatch(changeDateDown({date: newDate}))}>&#8593;</button>
        <div className="schedule-date">
          <p className="schedule-date__item schedule-date__item--hebrew-day">{DAYS_OF_WEEK[newDate.getDay()]}</p>
          <p className="schedule-date__item schedule-date__item--day">{newDate.getDate()}</p>
          <p className="schedule-date__item schedule-date__item--month">{MONTHS[newDate.getMonth()]}</p>
          <p className="schedule-date__item schedule-date__item--hebrew">{toHebrewJewishDate((toJewishDate(newDate))).day} {toHebrewJewishDate((toJewishDate(newDate))).monthName}</p>
        </div>
        <button className="schedule__day-btn schedule__day-btn--next" onClick={() => dispatch(changeDateUp({date: newDate}))}>&#8595;</button>
      </div>
      <table className="schedule__table schedule-section">
      <tbody>
        <p className="schedule-date__timer" style={{top: `calc(${currentTime / SECONDS_PER_DAY}*100% + 5px)`}}></p>
          <tr>
            <th></th>
            {
              missions.map((mission) => {
                return (
                  <th className="schedule__column-name__wrapper" key={mission.name}>
                    <p className="schedule__column-name">{mission.name}</p>
                  </th>
                )
              })
            }
          </tr>
          {HOURS.map((hour) => { 
            return (
              <tr className="schedule-hours hours__wrapper" key={`hour-${hour}`} data-hour={`${hour}`}>
                <td
                  className="schedule-hours__row"
                  key={`hour-${hour}`}
                >
                  <span>
                    {10 / hour > 1 ? '0' + hour : hour}:00
                  </span>
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
