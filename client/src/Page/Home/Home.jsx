import React from "react";
import "./Home.css";
import Fortune from "../../Components/HomePage/Fortune/Fortune";
import TopProductsSlider from "../../Components/HomePage/TopProductsSlider/TopProductsSlider";
import Categories from "../../Components/HomePage/Categories/Categories";
import LatestWinners from "../../Components/HomePage/LatestWinners/LatestWinners";
import InformationChat from "../../Components/HomePage/InformationChat/InformationChat";

function Home() {
  return (
    <>
      <Fortune />
      <TopProductsSlider />
      <Categories />
      <LatestWinners />
      <InformationChat/>
      
    </>
  );
}

export default Home;
