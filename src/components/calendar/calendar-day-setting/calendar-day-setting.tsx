import { useDispatch, useSelector } from "react-redux";
import { setCardStatus, changeSettingVisibility, clearSelect, setActiveButton } from "../../../store/calendar/calendar-actions";
import { MAX_UNAVAILABLE, SETTER_STATE, StatusesValues } from "../../../const";
import { RootState } from "../../../store/RootState";
import { useState } from "react";
import { Popup } from "../../popup/popup";

export function CalendarDaySetting(): JSX.Element {
  const dispatch = useDispatch();
  const newPosition = useSelector((state: RootState) => state.calendar.position);
  
  const selected = useSelector((state: RootState) => 
    state.calendar.selectedCardIds.values().next().value
  );

  const calendar = useSelector((state: RootState) => state.calendar.calendar)
  const day = useSelector((state: RootState) => state.calendar.calendar[selected]);
  const activeButton = useSelector((state: RootState) => state.calendar.activeButton);

  const [isSettingClosed, setSettingClosed] = useState(true);

  const handlePartlyButtonClick = () => {
    dispatch(setActiveButton({activeButton: StatusesValues.Partly}));
    dispatch(setCardStatus({ newStatus: StatusesValues.Partly, hourFrom: day.hourFrom, hourTo: day.hourTo}));
    dispatch(changeSettingVisibility({position: SETTER_STATE[2].position, margin: SETTER_STATE[2].margin }));
  };
  
  const handleUnavailableButtonClick = () => {
    dispatch(setActiveButton({activeButton: StatusesValues.Unavailable}));
    dispatch(changeSettingVisibility({position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
    if (calendar.filter((card) => card.status === StatusesValues.Unavailable).length < MAX_UNAVAILABLE) {
      dispatch(setCardStatus({ newStatus: StatusesValues.Unavailable}));
      dispatch(clearSelect());
    } else {
      dispatch(clearSelect());
      window.alert('עברת תקרת הימים החסומים!')
    }
  };
  
  const handleAvailableButtonClick = () => {
    dispatch(setActiveButton({activeButton: StatusesValues.Available}));
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
    document.documentElement.style.overflow = "hidden";
  }

  function onEnterBtnClick() {
    setPopup('enter');
    document.documentElement.style.overflow = "hidden";
  }

  function componentWillUnmount() {
    setPopup('');
    document.documentElement.style.overflow = "";
  }

  function onCancel() {
    componentWillUnmount();

    switch (popup) {
      case 'exit':
        dispatch(setCardStatus({newStatus: day.status, hourTo: undefined, hourFrom: day.hourFrom}));
        if (!day.hourFrom && !day.hourTo) {
          dispatch(setCardStatus({newStatus: StatusesValues.Available}));
          dispatch(setActiveButton({activeButton: StatusesValues.Available}))
        }
        break;
    
      case 'enter':
        dispatch(setCardStatus({newStatus: day.status, hourFrom: undefined, hourTo: day.hourTo}));
        if (!day.hourFrom && !day.hourTo) {
          dispatch(setCardStatus({newStatus: StatusesValues.Available}));
          dispatch(setActiveButton({activeButton: StatusesValues.Available}))
        }
        break;
    }
  }

  function setTimeTo() {
    componentWillUnmount();
    dispatch(clearSelect());
  }

  function setTimeFrom() {
    componentWillUnmount();
    dispatch(clearSelect());
  }

  return (
    <div className="calendar__day-setting" data-show={newPosition} style={{padding: popup && '0'}}>
      <span className="calendar__setting-toggler" aria-hidden="true" onClick={() => handleCloseSetting()}></span>
      <div className="calendar__buttons-wrapper">
        <button
          className={`calendar__setting-btn calendar__setting-btn--full ${activeButton === StatusesValues.Available ? 'calendar__setting-btn--full-active' : ''}`}
          onClick={() => handleAvailableButtonClick()}
        >נוכחות מלאה</button>
        <button
          className={`calendar__setting-btn calendar__setting-btn--partly ${activeButton === StatusesValues.Partly ? 'calendar__setting-btn--partly-active' : ''}`}
          onClick={() => handlePartlyButtonClick()}
        >נוכחות חלקית</button>
        <button
          className={`calendar__setting-btn calendar__setting-btn--unavailable ${activeButton === StatusesValues.Unavailable ? 'calendar__setting-btn--unavailable-active' : ''}`}
          onClick={() => handleUnavailableButtonClick()}
        >חסימה</button>
      </div>
      <div className="calendar__set-time">
        <span className="calendar__set-time__text">שעת יציאה</span>
        <button className="calendar__set-time__trigger" data-time-btn="daily-exit" onClick={onExitBtnClick}>{day?.hourTo ? day.hourTo : '00:00'}</button>
        <span className="calendar__set-time__text">שעת הגעה</span>
        <button className="calendar__set-time__trigger" data-time-btn="daily-enter" onClick={onEnterBtnClick}>{day?.hourFrom ? day.hourFrom : '23:59'}</button>
      </div>
      {popup === 'exit' && <Popup buttonType={"daily-exit"} onCancel={onCancel} onSubmit={setTimeTo}/>}
      {popup === 'enter' && <Popup buttonType={"daily-enter"} onCancel={onCancel} onSubmit={setTimeFrom}/>}
    </div>
  );
}
