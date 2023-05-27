import dayjs from 'dayjs';
import { User } from "../../types/user";
import './header.sass';
import { calendar } from '../../mocks/calendar';
import { STATUSES } from '../../const';

type HeaderProps = {
  user: User;
  dateFrom: Date;
  dateTo: Date;
}

export const formatDate = (date: Date, format: string) =>
  dayjs(date).format(format);

export function Header({user, dateFrom, dateTo}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="header__title-wrapper">
        <h1 className="header__title">שעון לחימה</h1>
      </div>
      <div className="header__content-wrapper">
        <p className="header__subtitle">שלום, {user.firstName}</p>
        <div className="header__description-wrapper">
          <p className="header__description">
            <b>
              הודעה חשובה
            </b>
            ! הצו עבור האימון והתעסוקה חל בין התאריכים: 
            <br/>
            {
              dateFrom.getMonth() === dateTo.getMonth()
                ? `${formatDate(dateTo, 'DD/MM/YYYY')} - ${dateFrom.getDate()}`
                : `${formatDate(dateTo, 'DD/MM/YYYY')} - ${formatDate(dateFrom, 'DD/MM')}`
            }</p>
          <p className="header__description">
            בשעון הלחימה תוכל לחסום ימי מילואים בהם אינך יכול להתייצב.
            בתעסוקה זו באפשרותך לחסום עד 4 ימי מילואים.
            <br/><b>
              שים לב! קיים מספר מוגבל של ימים אותם ניתן לחסום.
              קיימים ימים נעולים אליהם אתה מחויב להתייצב.
            </b>
          </p>
        </div>
        <b className="header__description--summary">
          הנך מתייצב ל:&nbsp;
          {
            calendar.filter(
              (item) => item.status === STATUSES[1] || item.status === STATUSES[4]
            ).length
          }
         &nbsp;ימי מילואים
        </b>
      </div>
    </header>
  );
}
