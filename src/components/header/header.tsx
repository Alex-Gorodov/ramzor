import dayjs from 'dayjs';
import './header.sass';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/RootState';
import { DISABLED_DAYS } from '../../mocks/calendar';
import { MAX_UNAVAILABLE, StatusesValues } from '../../const';

export const formatDate = (date: Date, format: string) =>
  dayjs(date).format(format);

  
export function Header(): JSX.Element {
  const calendar = useSelector((state: RootState) => state.calendar.calendar);
  const dateFrom = calendar[DISABLED_DAYS].date;
  const dateTo = calendar[calendar.length - DISABLED_DAYS - 1].date;

  const userInfo = useSelector(
    (state: RootState) => state.auth.userInfo
  );

  return (
    <header className="header">
      <div className="header__title-wrapper">
        <h1 className="header__title">שעון לחימה</h1>
      </div>
      <div className="header__content-wrapper">
        <p className="header__subtitle">שלום, {userInfo ? userInfo.firstName : ''}</p>
        <div className="header__description-wrapper">
          <p className="header__description">
            <b>
              הודעה חשובה
            </b>
            ! הצו עבור האימון והתעסוקה חל בין התאריכים: 
            <br/>
            {
              dateFrom.getMonth() === dateTo.getMonth()
                ? `${formatDate(dateTo, 'DD/MM/YYYY')} - ${dateFrom.getDate() < 10 ? '0' + dateFrom.getDate() : dateFrom.getDate()}`
                : `${formatDate(dateTo, 'DD/MM/YYYY')} - ${formatDate(dateFrom, 'DD/MM')}`
            }</p>
          <p className="header__description">
            בשעון הלחימה תוכל לחסום ימי מילואים בהם אינך יכול להתייצב.<br/>
            בתעסוקה זו באפשרותך לחסום עד {MAX_UNAVAILABLE} ימי מילואים.
            <br/><b>
              שים לב! קיים מספר מוגבל של ימים אותם ניתן לחסום.<br/>
              קיימים ימים נעולים אליהם אתה מחויב להתייצב.
            </b>
          </p>
        </div>
        <b className="header__description--summary">
          הנך מתייצב ל:&nbsp;
          {
            calendar.filter
            ((card) => 
              card.status === StatusesValues.Available
              || card.status === StatusesValues.Locked
              || card.status === StatusesValues.Partly
            ).length
          }
         &nbsp;ימי מילואים
        </b>
      </div>
    </header>
  );
}
