
import { useDispatch, useSelector } from "react-redux";
import { changeCardStatus, changeSettingVisibility } from "../../../store/calendar/calendar-actions";
import { DAY_SETTING, STATUSES } from "../../../const";
import { RootState } from "../../../store/RootState";
import { useState } from "react";

export function CalendarDaySetting(): JSX.Element {
  const dispatch = useDispatch();
  const newPosition = useSelector((state: RootState) => state.calendar.position);

  const [isSettingClosed, setSettingClosed] = useState(true);
  const [isPartlyButtonActive, setPartlyButtonActive] = useState(false);
  const [isAvailableButtonActive, setAvailableButtonActive] = useState(true);
  const [isUnavailableButtonActive, setUnavailableButtonActive] = useState(false);

  const handleSetPartlyButtonClick = () => {
    dispatch(changeSettingVisibility({position: DAY_SETTING[2].position, margin: DAY_SETTING[2].margin}));
    dispatch(changeCardStatus({cardStatus: STATUSES[2]}));
    setPartlyButtonActive(!isPartlyButtonActive);
    setAvailableButtonActive(false);
    setUnavailableButtonActive(false);
  }
  
  const handleSetUnavailableButtonClick = () => {
    dispatch(changeSettingVisibility({position: DAY_SETTING[1].position, margin: DAY_SETTING[1].margin}));
    dispatch(changeCardStatus({cardStatus: STATUSES[3]}));
    setUnavailableButtonActive(!isUnavailableButtonActive);
    setAvailableButtonActive(false);
    setPartlyButtonActive(false);
  }
  
  const handleSetAvailableButtonClick = () => {
    dispatch(changeSettingVisibility({position: DAY_SETTING[1].position, margin: DAY_SETTING[1].margin}));
    dispatch(changeCardStatus({cardStatus: STATUSES[1]}));
    setAvailableButtonActive(!isAvailableButtonActive)
    setPartlyButtonActive(false);
    setUnavailableButtonActive(false);
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
        <button
          className={`calendar__setting-btn calendar__setting-btn--full ${isAvailableButtonActive ? 'calendar__setting-btn--full--active' : ''}`}
          onClick={handleSetAvailableButtonClick}
        >נוכחות מלאה</button>
        <button
          className={`calendar__setting-btn calendar__setting-btn--partly ${isPartlyButtonActive ? 'calendar__setting-btn--partly--active' : ''}`}
          onClick={handleSetPartlyButtonClick}
        >נוכחות חלקית</button>
        <button
          className={`calendar__setting-btn calendar__setting-btn--unavailable ${isUnavailableButtonActive ? 'calendar__setting-btn--unavailable--active' : ''}`}
          onClick={handleSetUnavailableButtonClick}
        >חסימה</button>
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
