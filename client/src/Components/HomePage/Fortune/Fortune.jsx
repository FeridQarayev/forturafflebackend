import React from "react";
import "./Fortune.css";
const Fortune = () => {
  return (
   
      <section className="first__section">
        <div className="first__section__left">
          <div className="first__section__left__title">
            <h1>Şansınızı yoxlayın!</h1>
          </div>
          <div className="first__section__left__decription">
            <div className="first__section__left__decription__left">
              <h6>500+</h6>
              <p>Müştəri</p>
            </div>

            <div className="first__section__left__decription__right">
              <h6>1000+</h6>
              <p>Məhsul</p>
            </div>
          </div>
          <div className="first__section__left__button">
            <button className="first__section__left__button__btn">Bileti al</button>
          </div>
        </div>

        <div className="first__section__right">
          <img src="Assets/Home/Shop giveaway-pana 1.png" />
        </div>
      </section>

  );
};

export default Fortune;
