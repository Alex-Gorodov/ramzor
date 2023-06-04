import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import './popup.sass';
import { HOURS, MINUTES, StatusesValues } from '../../const';
import { useDispatch } from 'react-redux';
import { setCardStatus } from '../../store/calendar/calendar-actions';
// import { useRef } from 'react';

type PopupProps = {
  buttonType: string;
  onCancel?: () => void;
  onSubmit?: () => void;
}


export function Popup({buttonType, onCancel, onSubmit}: PopupProps): JSX.Element {
  const dispatch = useDispatch();
  let hour: string = '00';
  let minute: string = '00';

  const setTimeFrom = () => {
    dispatch(setCardStatus({newStatus: StatusesValues.Partly, hourFrom: `${hour}:${minute}`}));
    if (onSubmit) onSubmit();
  }

  const setTimeTo = () => {
    dispatch(setCardStatus({newStatus: StatusesValues.Partly, hourTo: `${hour}:${minute}`}));
    if (onSubmit) onSubmit();
  }

  return (
    <div className="popup-wrapper">
      <div className="popup__item">
        <h2 className="popup__title">
          {
            {
              "daily-exit" : "שעת יציאה",
              "daily-enter" : "שעת הגעה"
            }[buttonType]
          }
        </h2>
        <div className="popup__swipers-wrapper">
          <div className="popup__swiper-wrapper">
            <Swiper
              direction="vertical"
              className="popup__swiper popup__swiper--minutes"
              spaceBetween={15}
              slidesPerView={1}
              onSlideChange={(swiper) => minute = swiper.activeIndex.toString()}
              initialSlide={
                {
                  "daily-exit" : 0,
                  "daily-enter" : MINUTES[MINUTES.length - 1]
                }[buttonType]
              }
            >
              {MINUTES.map((minute) => (
                  <SwiperSlide className="popup__swipe" key={`minute-${minute}`}>
                    {
                      10 / minute > 1 ? '0' + minute : minute
                    }
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          :
          <div className="popup__swiper-wrapper">
            <Swiper
              direction="vertical"
              className="popup__swiper popup__swiper--hours"
              spaceBetween={15}
              slidesPerView={1}
              onSlideChange={(swiper) => hour = swiper.activeIndex.toString()}
              initialSlide={
                {
                  "daily-exit" : 0,
                  "daily-enter" : HOURS[HOURS.length - 1]
                }[buttonType]
              }
            >
              {HOURS.map((hour) => (
                  <SwiperSlide
                    className="popup__swipe"
                    key={`hour-${hour}`}
                    >
                    {
                      10 / hour > 1 ? '0' + hour : hour
                    }
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        <div className="popup__buttons-wrapper">
          <button className="popup__btn" onClick={onCancel}>ביטול</button>
          <button
            className="popup__btn popup__btn--bold"
            onClick={
              {
                "daily-exit" : setTimeTo,
                "daily-enter" : setTimeFrom
              }[buttonType]
          }>סיום</button>
        </div>
      </div>
    </div>
  );
}
