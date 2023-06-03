import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/mousewheel';
import './popup.sass';
import { Mousewheel } from 'swiper';
import { HOURS, MINUTES } from '../../const';

type PopupProps = {
  buttonType: string;
}

export function Popup({buttonType}: PopupProps): JSX.Element {
  document.body.style.overflow = 'hidden';
  
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
              modules={[Mousewheel]}
              direction="vertical"
              className="popup__swiper popup__swiper--minutes"
              spaceBetween={15}
              slidesPerView={1}
              initialSlide={
                {
                  "daily-exit" : MINUTES[MINUTES.length - 1],
                  "daily-enter" : 0
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
              initialSlide={
                {
                  "daily-exit" : HOURS[HOURS.length - 1],
                  "daily-enter" : 0
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
          <button className="popup__btn">ביטול</button>
          <button className="popup__btn popup__btn--bold">סיום</button>
        </div>
      </div>
    </div>
  );
}
