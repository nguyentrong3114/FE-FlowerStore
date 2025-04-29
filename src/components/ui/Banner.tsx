"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[800px]">
        <Swiper
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={800}
        >
          {[
            '/img/banner1.webp',
            '/img/banner2.jpg',
            '/img/banner.jpg',
            '/img/banner4.jpg',
          ].map((src, idx) => (
            <SwiperSlide key={idx}>
            <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={`Banner ${idx + 1}`}
                  fill            
                  className="object-cover"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
