import { changeDateDown, changeDateUp, removeMission, toggleForm } from "../../store/admin/admin-actions";
import { DAYS_OF_WEEK, HOURS, MONTHS, SECONDS_PER_DAY } from "../../const"
import { AddMissionForm } from "../add-mission-form/add-mission-form";
import { toHebrewJewishDate, toJewishDate } from "jewish-date";
import { ScheduledMission } from "./scheduled-mission";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/RootState";
import { useEffect, useRef, useState } from "react";
import './schedule.sass';

export function ScheduleTable(): JSX.Element {
  const dispatch = useDispatch();
  const newDate = useSelector((state: RootState) => state.admin.date);
  const newMissions = useSelector((state: RootState) => state.admin.missions)
  const currentTimeInSec = (newDate.getHours())*60*60 + newDate.getMinutes()*60 + newDate.getSeconds();
  const isFormOpened = useSelector((state: RootState) => state.admin.isFormOpened);
  const positionRef = useRef<HTMLTableCellElement>(null);
  const [position, setPosition] = useState(150);

  useEffect(() => {
    const element = positionRef.current;

    const updatePosition = () => {
      if (element) {
        const rect = element.getBoundingClientRect();
        setPosition(window.innerWidth - rect.left);
      }
    }
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
  }, []);
  
  const uniqueMissions = newMissions.filter((mission, name, array) => {
    return array.findIndex((item) => item.name === mission.name) === name;
  })
  
  const [dayTimePercentage, setDayTimePercentage] = useState(
    (100 - (43 / window.innerHeight) * 100) * (currentTimeInSec / SECONDS_PER_DAY)
  );
  
  useEffect(() => {
    const updateWindowSize = () => {
      const newWh = window.innerHeight;
      setDayTimePercentage(() => (100 - (43 / newWh) * 100) * (currentTimeInSec / SECONDS_PER_DAY));
    };
  
    window.addEventListener("resize", updateWindowSize);
  
    const intervalId = setInterval(() => {
      setDayTimePercentage((prevPercentage) => prevPercentage + 100 / SECONDS_PER_DAY);
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", updateWindowSize);
    };
  }, [currentTimeInSec]);

  return (
    <>
      <h1 className="schedule__title">
        <span></span>
        שעון לחימה | גדוד ראם 9213
      </h1>
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
      <AddMissionForm/>
        <table className="schedule__table schedule-section">
          {
            newDate.getDay() === new Date().getDay()
            ?
            <tfoot className="schedule-date__timer" style={{ top: `calc(${dayTimePercentage}% + ${0.53 * dayTimePercentage}px)`}}/>
            :
            ''
          }
          <tbody>
            <tr className="schedule__head" style={{right: `${position}px`}}>
              {
                uniqueMissions.map((mission) => {
                  return (
                    <th className="schedule__column-name__container" key={`col-${mission.id}`}>
                      <div className="schedule__column-name__wrapper">
                        <span className="schedule__column-name">{mission.name}</span>
                        <button
                          className="schedule__mission-btn schedule__mission-btn--remove"
                          onClick={() => dispatch(removeMission({mission}))}>
                            <span className="visually-hidden">להסיר {mission.name}</span>
                        </button>
                      </div>
                    </th>
                  )
                })
              }
              <th className="schedule__column-name__container schedule__column-name__container--last">
                <button
                  className="schedule__mission-btn schedule__mission-btn--add"
                  onClick={() => dispatch(toggleForm({ isOpened: !isFormOpened }))}
                >
                  +
                </button>
              </th>
            </tr>
            {
              newMissions.map((mission) => {
                return ((mission.startDate instanceof Date && mission.startDate.getDay() === newDate.getDay()) &&
                (
                  <ScheduledMission key={mission.id} mission={mission}/>
                ))
              })
            }
            {HOURS.map((hour) => {
              return (
                <tr className="schedule-hours hours__wrapper" key={`hour-${hour}`} data-hour={`${hour}`}>
                  <td
                    className="schedule-hours__row"
                    ref={positionRef.current ? undefined : positionRef}
                  >
                    <span>
                      {10 / hour > 1 ? '0' + hour : hour}:00
                    </span>
                  </td>
                  {
                    uniqueMissions.map((mission) => {
                      return (
                        <td
                          className="schedule-hours__cell"
                          data-mission-length={mission.duration + ' שעות'}
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
                  <td className="schedule-hours__cell schedule-hours__cell--last"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </>
  );
}
