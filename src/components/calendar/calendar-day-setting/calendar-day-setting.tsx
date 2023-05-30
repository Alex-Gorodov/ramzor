import { useDispatch, useSelector } from "react-redux";
import { changeCardStatus, changeSettingVisibility, removeSelect, selectCard } from "../../../store/calendar/calendar-actions";
import { SETTER_STATE, STATUSES } from "../../../const";
import { RootState } from "../../../store/RootState";
import { useState } from "react";

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

  const handleSetPartlyButtonClick = (cardId: number) => {
    dispatch(selectCard({ cardId, isSelected: true }));
    if (!isPartlyButtonActive) {
      dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[2].position, margin: SETTER_STATE[2].margin }));
      dispatch(changeCardStatus({ cardId, cardStatus: STATUSES[2] }));
    } else {
      dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
      dispatch(removeSelect({ cardStatus: STATUSES[2], cardId }));
    }
    setPartlyButtonActive(!isPartlyButtonActive);
    setAvailableButtonActive(false);
    setUnavailableButtonActive(false);
  };

  const handleSetUnavailableButtonClick = (cardId: number) => {
    dispatch(selectCard({ cardId, isSelected: true }));
    if (!isUnavailableButtonActive) {
      dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[1].position, margin: SETTER_STATE[1].margin }));
      dispatch(changeCardStatus({ cardId, cardStatus: STATUSES[3] }));
    } else {
      dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
      dispatch(removeSelect({ cardStatus: STATUSES[3], cardId }));
    }
    setUnavailableButtonActive(!isUnavailableButtonActive);
    setAvailableButtonActive(false);
    setPartlyButtonActive(false);
  };

  const handleSetAvailableButtonClick = (cardId: number) => {
    dispatch(selectCard({ cardId, isSelected: true }));
    if (!isAvailableButtonActive) {
      dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[1].position, margin: SETTER_STATE[1].margin }));
      dispatch(changeCardStatus({ cardId, cardStatus: STATUSES[1] }));
    } else {
      dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
      dispatch(removeSelect({ cardStatus: STATUSES[1], cardId }));
    }
    setAvailableButtonActive(!isAvailableButtonActive);
    setPartlyButtonActive(false);
    setUnavailableButtonActive(false);
  };

  const handleCloseSetting = (cardId: number) => {
    isSettingClosed && newPosition === (SETTER_STATE[1].position || SETTER_STATE[2].position)
      ? dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[1].position, margin: SETTER_STATE[1].margin }))
      : dispatch(changeSettingVisibility({ cardId, position: SETTER_STATE[0].position, margin: SETTER_STATE[0].margin }));
    setSettingClosed(!isSettingClosed);
  };

  return (
    <div className="calendar__day-setting" data-show={newPosition}>
      <span className="calendar__setting-toggler" aria-hidden="true" onClick={() => cardId !== null ? handleCloseSetting(cardId) : undefined}></span>
      <div className="calendar__buttons-wrapper">
        <button
          className={`calendar__setting-btn calendar__setting-btn--full ${isAvailableButtonActive ? 'calendar__setting-btn--full--active' : ''}`}
          onClick={() => cardId !== null ? handleSetAvailableButtonClick(cardId) : undefined}
        >נוכחות מלאה</button>
        <button
          className={`calendar__setting-btn calendar__setting-btn--partly ${isPartlyButtonActive ? 'calendar__setting-btn--partly--active' : ''}`}
          onClick={() => cardId !== null ? handleSetPartlyButtonClick(cardId) : undefined}
        >נוכחות חלקית</button>
        <button
          className={`calendar__setting-btn calendar__setting-btn--unavailable ${isUnavailableButtonActive ? 'calendar__setting-btn--unavailable--active' : ''}`}
          onClick={() => cardId !== null ? handleSetUnavailableButtonClick(cardId) : undefined}
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
