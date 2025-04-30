"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";


const Banner = () => {
  const images = [
    "/img/banner1.webp",
    "/img/banner2.jpg",
    "/img/banner.jpg",
    "/img/banner4.jpg",
  ];

  const rows = 5;
  const cols = 8;

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[800px]">
        <Swiper
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          speed={1000}
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-[300px] overflow-hidden rounded-lg grid grid-cols-8 grid-rows-5">
                {Array.from({ length: rows * cols }).map((_, tileIdx) => {
                  const row = Math.floor(tileIdx / cols);
                  const col = tileIdx % cols;
                  const delay = (row + col) * 60;

                  return (
                    <div
                      key={tileIdx}
                      className="tile"
                      style={{
                        backgroundImage: `url(${src})`,
                        backgroundSize: `${cols * 100}% ${rows * 100}%`,
                        backgroundPosition: `${(col * 100) / (cols - 1)}% ${
                          (row * 100) / (rows - 1)
                        }%`,
                        animationDelay: `${delay}ms`,
                      }}
                    />
                  );
                })}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
