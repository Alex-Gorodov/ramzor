
import { useDispatch, useSelector } from "react-redux";
import { changeSettingVisibility } from "../../../store/calendar/calendar-actions";
import { DAY_SETTING } from "../../../const";
import { RootState } from "../../../store/RootState";
import { useState } from "react";

export function CalendarDaySetting(): JSX.Element {
  const dispatch = useDispatch();
  const newPosition = useSelector((state: RootState) => state.calendar.position);

  const [isSettingClosed, setSettingClosed] = useState(true);

  const handleSetPartlyButtonClick = () => {
    dispatch(changeSettingVisibility({position: DAY_SETTING[2].position, margin: DAY_SETTING[2].margin}));
  }

  const handleCloseSetting = () => {
    isSettingClosed && newPosition !== (DAY_SETTING[1].position || DAY_SETTING[2].position)
      ? dispatch(changeSettingVisibility({position: DAY_SETTING[1].position, margin: DAY_SETTING[1].margin}))
      : dispatch(changeSettingVisibility({position: DAY_SETTING[0].position, margin: DAY_SETTING[0].margin}))
      setSettingClosed(!isSettingClosed)
  }
  
  return (
    <div className="calendar__day-setting" data-show={newPosition}>
      <span className="calendar__setting-toggler" aria-hidden="true" onClick={handleCloseSetting}></span>
      <div className="calendar__buttons-wrapper">
        <button className="calendar__setting-btn calendar__setting-btn--full">נוכחות מלאה</button>
        <button
          className="calendar__setting-btn calendar__setting-btn--partly"
          onClick={handleSetPartlyButtonClick}
        >נוכחות חלקית</button>
        <button className="calendar__setting-btn calendar__setting-btn--unavailable">חסימה</button>
      </div>
      <div className="calendar__set-time">
        <span className="calendar__set-time__text">שעת יציאה</span>
        <button className="calendar__set-time__trigger" data-time-btn="daily-exit">00:00</button>
        <span className="calendar__set-time__text">שעת הגעה</span>
        <button className="calendar__set-time__trigger" data-time-btn="daily-enter">23:59</button>
      </div>
    </div>
  );
}
