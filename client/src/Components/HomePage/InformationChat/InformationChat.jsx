import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./InformationChat.css";
const InformationChat = () => {
  return (
    <section>
      <div className="fifth__section">
        <div className="fifth__section__left">
          <h1>Bizdən xəbərdar olun</h1>
          <p>
            E-mail vasitəsilə abunə olaraq ən son yeniliklərdən ilk siz xəbərdar
            ola bilərsiniz!
          </p>
          <div className="fifth__section__left__emailBox">
            <div className="fifth__section__left__emailBox__input">
              <input
                type="text"
                placeholder="E-mailinizi daxil edə bilərsiniz"
              ></input>
            </div>
            <div className="fifth__section__left__emailBox__button">
              <div className="fifth__section__left__emailBox__des">Göndər</div>
              <div className="fifth__section__left__emailBox__arrow">
                <AiOutlineArrowRight />
              </div>
            </div>
          </div>
        </div>
        <div className="fifth__section__right">
          <img src="Assets/Home/Newsletter.png" />
        </div>
      </div>
    </section>
  );
};

export default InformationChat;
