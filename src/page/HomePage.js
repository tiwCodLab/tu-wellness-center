import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../utils/AuthProvider";
const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const auth = useAuth();

  return (
    <>
      {auth?.user?.username ? (
        <div className="bg-gradient-to-r from-teal-800 to-teal-600 mt-1 rounded-lg">
          <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-center text-white">
              TULP WELLNESS CENTER
            </h1>
          </div>

          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Slider {...settings}>
              <div>
                <img
                  src="https://via.placeholder.com/1200x600?text=Slide+1"
                  alt="Slide 1"
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/1200x600?text=Slide+2"
                  alt="Slide 2"
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/1200x600?text=Slide+3"
                  alt="Slide 3"
                  className="w-full rounded-lg"
                />
              </div>
            </Slider>
          </main>
          <footer className="bg-gradient-to-r from-teal-800 to-teal-600 text-white py-2 rounded-b-lg mt-2">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
              <p>&copy; 2024 ห้องพยาบาลมหาวิทยาลัยธรรมศาสตร์ ศูนย์ลำปาง</p>
            </div>
          </footer>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-teal-800 to-teal-600 mt-1 rounded-lg">
          <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white text-center">
              ห้องพยาบาลมหาวิทยาลัยธรรมศาสตร์ ศูนย์ลำปาง
            </h1>
          </div>

          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Slider {...settings}>
              <div>
                <img
                  src="https://via.placeholder.com/1200x600?text=Slide+1"
                  alt="Slide 1"
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/1200x600?text=Slide+2"
                  alt="Slide 2"
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/1200x600?text=Slide+3"
                  alt="Slide 3"
                  className="w-full rounded-lg"
                />
              </div>
            </Slider>
          </main>
          <footer className="bg-gradient-to-r from-teal-800 to-teal-600 text-white py-2 rounded-b-lg mt-2">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
              <p>&copy; 2024 ห้องพยาบาลมหาวิทยาลัยธรรมศาสตร์ ศูนย์ลำปาง</p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default HomePage;
