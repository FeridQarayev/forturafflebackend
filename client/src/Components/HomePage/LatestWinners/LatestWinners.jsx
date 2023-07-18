import React from "react";
import LatestWinner from "../../../Data/HomePage/LatestWinners.json";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./LatestWinners.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
export default function App() {
  return (
    <section className="fourth__section">
      <div className="fourth__section__boxs">
        <h1> Ən son qazananlar</h1>
        <div className="fourth__section__cards">
          <Swiper
            slidesPerView={2}
            // mousewheel={true}
            modules={[]}
            className="mySwiper"
          >
            {LatestWinner.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="fourth__section__cards__card">
                  <div className="fourth__section__cards__card__left">
                    <img src="Assets/home/airpod.jpg" />
                  </div>
                  <div className="fourth__section__cards__card__right">
                    <div className="fourth__section__cards__card__right__des">
                      <h2>{item.title} </h2>
                      <p>
                        Məhsulun dəyəri: <span>{item.value}AZN</span>
                      </p>
                      <p>
                        Qazanan:<span>{item.winner}</span>
                      </p>
                      <p>
                        Tarix:<span>{item.date}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="third__section__button__2">
        <div className="third__section__button__2__des">Daha çox məhsul</div>
        <div className="third__section__button__2__arrow">
          <AiOutlineArrowRight />
        </div>
      </div>
    </section>
  );
}
