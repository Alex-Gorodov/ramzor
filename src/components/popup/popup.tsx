import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import './popup.sass';
import { HOURS, MINUTES, StatusesValues } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { setCardStatus } from '../../store/calendar/calendar-actions';
import { RootState } from '../../store/RootState';

type PopupProps = {
  buttonType: string;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export function Popup({buttonType, onCancel, onSubmit}: PopupProps): JSX.Element {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => 
    state.calendar.selectedCardIds.values().next().value
  );

  const day = useSelector((state: RootState) => state.calendar.calendar[selected])

  let hour: number = 0;
  let minute: number = 0;

  const setTimeFrom = () => {
    day.hourTo
      ? dispatch(setCardStatus({newStatus: StatusesValues.Partly, hourFrom: `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`, hourTo: day.hourTo}))
      : dispatch(setCardStatus({newStatus: StatusesValues.Partly, hourFrom: `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`}))
    if (onSubmit) onSubmit();
  }

  const setTimeTo = () => {
    day.hourFrom 
      ? dispatch(setCardStatus({newStatus: StatusesValues.Partly, hourFrom: day.hourFrom, hourTo: `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`}))
      : dispatch(setCardStatus({newStatus: StatusesValues.Partly, hourTo: `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`}))
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
              slidesPerView={3}
              slidesPerGroup={1}
              centerInsufficientSlides
              centeredSlides
              touchRatio={2}
              slideNextClass='slide__gray--next'
              slidePrevClass='slide__gray--prev'
              onSlideChange={(swiper) => minute = swiper.activeIndex}
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
              slidesPerView={3}
              slidesPerGroup={1}
              centerInsufficientSlides
              centeredSlides
              touchRatio={1}
              slideNextClass='slide__gray--next'
              slidePrevClass='slide__gray--prev'
              onSlideChange={(swiper) => hour = swiper.activeIndex}
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
