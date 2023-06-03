import { useDispatch, useSelector } from "react-redux";
import { setCardStatus, changeSettingVisibility, removeSelect, changeSettingStatus } from "../../../store/calendar/calendar-actions";
import { SETTER_STATE, STATUSES } from "../../../const";
import { RootState } from "../../../store/RootState";
import { useState } from "react";
import { Popup } from "../../popup/popup";

type CalendarDaySettingProps = {
  cardId: number | null;
};

export function CalendarDaySetting({ cardId }: CalendarDaySettingProps): JSX.Element {
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

  const handlePartlyButtonClick = (cardId: number) => {
    setButtons(false, !isPartlyButtonActive, false);
    setPartlyButtonActive(!isPartlyButtonActive);
    dispatch(changeSettingStatus({settingStatus: STATUSES[2]}));
    dispatch(setCardStatus({ cardId, cardStatus: STATUSES[2] }));
    dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[2].position, margin: SETTER_STATE[2].margin }));
    // dispatch(removeSelect({ cardStatus: STATUSES[2], cardId }));
    dispatch(changeSettingStatus({settingStatus: STATUSES[1]}));
  };
  
  const handleUnavailableButtonClick = (cardId: number) => {
    setButtons(false, false, !isUnavailableButtonActive);
    dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
    dispatch(changeSettingStatus({settingStatus: STATUSES[3]}));
    dispatch(setCardStatus({ cardId, cardStatus: STATUSES[3]}));
    dispatch(removeSelect({ cardStatus: STATUSES[3], cardId }));
    setButtons(true, false, false);
    dispatch(changeSettingStatus({settingStatus: STATUSES[1]}));
  };
  
  const handleAvailableButtonClick = (cardId: number) => {
    setButtons(true, false, false);
    dispatch(changeSettingStatus({settingStatus: STATUSES[1]}));
    dispatch(setCardStatus({ cardId, cardStatus: STATUSES[1] }));
    dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
    dispatch(removeSelect({ cardStatus: STATUSES[1], cardId }));
    dispatch(changeSettingStatus({settingStatus: STATUSES[1]}));

  };

  const handleCloseSetting = (cardId: number) => {
    isSettingClosed && newPosition === (SETTER_STATE[1].position || SETTER_STATE[2].position)
      ? dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[1].position, margin: SETTER_STATE[1].margin }))
      : dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
    setSettingClosed(!isSettingClosed);
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

  return (
    <div className="calendar__day-setting" data-show={newPosition}>
      <span className="calendar__setting-toggler" aria-hidden="true" onClick={() => cardId !== null ? handleCloseSetting(cardId) : undefined}></span>
      <div className="calendar__buttons-wrapper">
        <button
          className={`calendar__setting-btn calendar__setting-btn--full ${isAvailableButtonActive ? 'calendar__setting-btn--full-active' : ''}`}
          onClick={() => cardId !== null ? handleAvailableButtonClick(cardId) : undefined}
        >נוכחות מלאה</button>
        <button
          className={`calendar__setting-btn calendar__setting-btn--partly ${isPartlyButtonActive ? 'calendar__setting-btn--partly-active' : ''}`}
          onClick={() => cardId !== null ? handlePartlyButtonClick(cardId) : undefined}
        >נוכחות חלקית</button>
        <button
          className={`calendar__setting-btn calendar__setting-btn--unavailable ${isUnavailableButtonActive ? 'calendar__setting-btn--unavailable-active' : ''}`}
          onClick={() => cardId !== null ? handleUnavailableButtonClick(cardId) : undefined}
        >חסימה</button>
      </div>
      <div className="calendar__set-time">
        <span className="calendar__set-time__text">שעת יציאה</span>
        <button className="calendar__set-time__trigger" data-time-btn="daily-exit" onClick={onExitBtnClick}>00:00</button>
        <span className="calendar__set-time__text">שעת הגעה</span>
        <button className="calendar__set-time__trigger" data-time-btn="daily-enter" onClick={onEnterBtnClick}>23:59</button>
      </div>
      {popup === 'exit' && <Popup buttonType={"daily-exit"} onCancel={componentWillUnmount} onSubmit={componentWillUnmount}/>}
      {popup === 'enter' && <Popup buttonType={"daily-enter"} onCancel={componentWillUnmount} onSubmit={componentWillUnmount}/>}
    </div>
  );
}
