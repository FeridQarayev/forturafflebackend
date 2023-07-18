import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Categories from "../../../Data/HomePage/Categories.json";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./Categories.css";
export default function App() {
  return (
    <section className="third__section__total">
      <div className="third__section">
        <h1>Kateqoriyalar</h1>
      </div>

      <div className="third__section__cards">
      <Swiper
      slidesPerView={3}
      // mousewheel={true}
      modules={[]}
      className="mySwiper"
    >
        {Categories.map((item) => (
          <SwiperSlide key={item.id}>
          <div  key={item.id} className="third__section__cards__card">
            <div className="third__section__cards__card__img">
              <img src={item.image} />
            </div>
            <div className="third__section__cards__card__title">
              {item.title}
            </div>

            <div className="third__section__button">
              <div className="third__section__button__des">Məhsuallara bax</div>
              <div className="third__section__button__arrow">
                <AiOutlineArrowRight />
              </div>
            </div>
          </div>
         </SwiperSlide>
        ))}
        </Swiper>
        <div className="third__section__button__2">
          <div className="third__section__button__2__des">Hamısına bax</div>
          <div className="third__section__button__2__arrow">
            <AiOutlineArrowRight />
          </div>
        </div>
      </div>
    </section>
  );
};


