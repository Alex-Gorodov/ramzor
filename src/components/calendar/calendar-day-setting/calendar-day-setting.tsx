import { useDispatch, useSelector } from "react-redux";
import { setCardStatus, changeSettingVisibility, clearSelect } from "../../../store/calendar/calendar-actions";
import { SETTER_STATE, StatusesValues } from "../../../const";
import { RootState } from "../../../store/RootState";
import { useState } from "react";
import { Popup } from "../../popup/popup";

export function CalendarDaySetting(): JSX.Element {
  const dispatch = useDispatch();
  const newPosition = useSelector((state: RootState) => state.calendar.position);
  const [isSettingClosed, setSettingClosed] = useState(true);
  const [isPartlyButtonActive, setPartlyButtonActive] = useState(false);
  const [isAvailableButtonActive, setAvailableButtonActive] = useState(true);
  const [isUnavailableButtonActive, setUnavailableButtonActive] = useState(false);

  function setButtons(available: boolean, partly: boolean, unavailable: boolean) {
    setAvailableButtonActive(available);
    setPartlyButtonActive(partly);
    setUnavailableButtonActive(unavailable);
  }

  const handlePartlyButtonClick = () => {
    setButtons(false, !isPartlyButtonActive, false);
    setPartlyButtonActive(!isPartlyButtonActive);
    dispatch(setCardStatus({ newStatus: StatusesValues.Partly }));
    dispatch(changeSettingVisibility({position: SETTER_STATE[2].position, margin: SETTER_STATE[2].margin }));
  };
  
  const handleUnavailableButtonClick = () => {
    setButtons(false, false, !isUnavailableButtonActive);
    dispatch(changeSettingVisibility({position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
    dispatch(setCardStatus({ newStatus: StatusesValues.Unavailable}));
    dispatch(clearSelect());
  };
  
  const handleAvailableButtonClick = () => {
    setButtons(true, false, false);
    dispatch(setCardStatus({ newStatus: StatusesValues.Available }));
    dispatch(changeSettingVisibility({position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
    dispatch(clearSelect());

  };

  const handleCloseSetting = () => {
    isSettingClosed && newPosition === (SETTER_STATE[1].position || SETTER_STATE[2].position)
      ? dispatch(changeSettingVisibility({ position: SETTER_STATE[1].position, margin: SETTER_STATE[1].margin }))
      : dispatch(changeSettingVisibility({ position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
    setSettingClosed(!isSettingClosed);
    dispatch(clearSelect());
  };

  const [popup, setPopup] = useState('');

  function onExitBtnClick() {
    setPopup('exit');
    document.body.style.overflow = "hidden";
  }

  function onEnterBtnClick() {
    setPopup('enter');
    document.body.style.overflow = "hidden";
  }

  function componentWillUnmount() {
    setPopup('');
    document.body.style.overflow = "";
  }

  function setTimeTo() {
    setButtons(true, false, false);
    componentWillUnmount();
    dispatch(clearSelect());
  }

  function setTimeFrom() {
    setButtons(true, false, false);
    componentWillUnmount();
    dispatch(clearSelect());
  }

  return (
    <div className="calendar__day-setting" data-show={newPosition}>
      <span className="calendar__setting-toggler" aria-hidden="true" onClick={() => handleCloseSetting()}></span>
      <div className="calendar__buttons-wrapper">
        <button
          className={`calendar__setting-btn calendar__setting-btn--full ${isAvailableButtonActive ? 'calendar__setting-btn--full-active' : ''}`}
          onClick={() => handleAvailableButtonClick()}
        >נוכחות מלאה</button>
        <button
          className={`calendar__setting-btn calendar__setting-btn--partly ${isPartlyButtonActive ? 'calendar__setting-btn--partly-active' : ''}`}
          onClick={() => handlePartlyButtonClick()}
        >נוכחות חלקית</button>
        <button
          className={`calendar__setting-btn calendar__setting-btn--unavailable ${isUnavailableButtonActive ? 'calendar__setting-btn--unavailable-active' : ''}`}
          onClick={() => handleUnavailableButtonClick()}
        >חסימה</button>
      </div>
      <div className="calendar__set-time">
        <span className="calendar__set-time__text">שעת יציאה</span>
        <button className="calendar__set-time__trigger" data-time-btn="daily-exit" onClick={onExitBtnClick}>00:00</button>
        <span className="calendar__set-time__text">שעת הגעה</span>
        <button className="calendar__set-time__trigger" data-time-btn="daily-enter" onClick={onEnterBtnClick}>23:59</button>
      </div>
      {popup === 'exit' && <Popup buttonType={"daily-exit"} onCancel={componentWillUnmount} onSubmit={setTimeTo}/>}
      {popup === 'enter' && <Popup buttonType={"daily-enter"} onCancel={componentWillUnmount} onSubmit={setTimeFrom}/>}
    </div>
  );
}
