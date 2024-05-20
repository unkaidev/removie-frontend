import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { register } from "swiper/element/bundle";
register();
import {
  EffectCoverflow,
  Autoplay,
  Navigation,
} from "swiper/modules";
import { backgroundPoster } from "../utils/constants/const";
import { useEffect } from "react";
import { useState } from "react";

export default function SwiperMovie({ movies, openModal }) {
  const [slidesPerView, setSlidesPerView] = useState(3);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(4);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <swiper-container
        effect="coverflow"
        navigation={true}
        slides-per-view={slidesPerView}
        centered-slides="true"
        speed="500"
        autoplay-delay="1000"
        autoplay-pause-on-mouse-enter={true}
        coverflow-effect-rotate={"0"}
        coverflow-effect-stretch={"50"}
        coverflow-effect-depth={"100"}
        coverflow-effect-modifier={"2.5"}
        modules={[Autoplay, EffectCoverflow, Navigation]}
      >
        {movies?.content?.map((movie) => {
          return (
            <swiper-slide key={movie.imdbId}>
              <div
                onClick={() => {
                  openModal(movie)
                }}
                className="  flex items-center justify-center rounded-">
                <img
                  className="object-cover rounded-xl hover:scale-95 duration-500 cursor-pointer "
                  src={movie.poster}
                  alt={movie.title}
                />
              </div>
            </swiper-slide>
          );
        })}{" "}
      </swiper-container>
    </>
  );
}
