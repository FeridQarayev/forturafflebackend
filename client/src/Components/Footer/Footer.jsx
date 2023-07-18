import React from "react";
import { Link } from "react-router-dom";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import "./Footer.css";
function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footer__above">
          <div className="footer__above__left">
            <h2>Əlaqə</h2>
            <p>forturaffle@gmail.com</p>
            <p>+994 55 444 44 44</p>
            <div className="footer__above__left__social__media">
              <div className="facebook">
                <BiLogoFacebookCircle />
              </div>
              <div className="instagram">
                <AiOutlineInstagram />
              </div>
              <div className="twitter">
                <AiOutlineTwitter />
              </div>
              <div className="telegram">
                <BsTelegram />
              </div>
            </div>
          </div>
          <div className="footer__above__middle">
            <Link to="/">
              <h1>Haqqımızda</h1>
            </Link>
            <Link to="/categories">
              <h1>Məhsullar</h1>
            </Link>
            <Link to="/win">
              <h1>Son qazananlar</h1>
            </Link>
            <Link to="/faq">
              <h1>FAQ</h1>
            </Link>
          </div>
          <div className="footer__above__right">
            <div className="footer__above__right__loqo">
              <Link to="/">
                <img src="Assets/navbar/Logo.png" alt="Logo" />
              </Link>
              <h1>
                <Link to="/">Forturaffle</Link>
              </h1>
            </div>
            <p>Biz sizin şansınıza güvənirik!</p>
          </div>
        </div>
        <div className="footer__belove">
          <p>
            İstifade qaydaları | Gizlilik Siyasəti | 2023 Forturaffle.Bütün
            hüquqlar qorunur.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
