export function CalendarDaySetting(): JSX.Element {
  return (
    <div className="calendar__day-setting">
        <div className="calendar__buttons-wrapper">
          <button className="calendar__setting-btn calendar__setting-btn--full">נוכחות מלאה</button>
          <button className="calendar__setting-btn calendar__setting-btn--partly">נוכחות חלקית</button>
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
