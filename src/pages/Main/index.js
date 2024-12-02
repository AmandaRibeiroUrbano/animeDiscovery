import React from "react";
import Slider from "react-slick";
import "./Main.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";
import Footer from "components/Footer";
import NeonButton from "components/NeonButton";


const Main = ({ animeImages }) => {

  let navigate = useNavigate();

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };

  return (
    <>
    <main className="main-page slide-down">
      <div className="text-container">
          <h1 tabIndex="0">Descubra novos animes para assistir!</h1>
          <p tabIndex="0">
            Está procurando por novos animes para assistir? Informe suas preferências e nós 
            indicaremos as melhores opções para você.
          </p>
          <NeonButton 
          action= {() => navigate("/anime_filters")}
          content="Começar" 
          />
        </div>
        <aside className="slider-container">
          {animeImages.length === 0 ? (
            <div className="loading" />
          ) : (
            <Slider {...sliderSettings}>
              {animeImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={"anime"}
                    className="anime-image"
                  />
                </div>
              ))}
            </Slider>
          )}
        </aside>
          </main>
        <Footer />
        </>
  );
}

export default Main;
