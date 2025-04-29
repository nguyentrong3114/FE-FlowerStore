"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="flex justify-center w-full max-w-full">
      <Swiper
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={800} 
      >
        <SwiperSlide>
          <Image 
            src="/img/banner1.webp" 
            alt="Banner 1" 
            width={800} 
            height={300} 
            layout="intrinsic"
            priority 
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image 
            src="/img/banner2.jpg" 
            alt="Banner 2" 
            width={800} 
            height={300} 
            layout="intrinsic"
            priority
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image 
            src="/img/banner3.jpg" 
            alt="Banner 3" 
            width={800} 
            height={300} 
            layout="intrinsic"
            priority
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image 
            src="/img/banner4.jpg" 
            alt="Banner 4" 
            width={800} 
            height={300} 
            layout="intrinsic"
            priority
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
