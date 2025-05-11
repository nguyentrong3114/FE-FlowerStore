"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImageCustom from "./ImageCustom";

export default function ProductBanner() {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation
        pagination={{ clickable: true }}
        className="rounded-lg overflow-hidden"
      >
        <SwiperSlide>
          <ImageCustom
            src="/img/product/banner1.avif"
            alt="Banner 1"
            title="Dior Perfume"
            desc="Experience the timeless elegance of Dior's signature fragrance."
            href="/products/dior"
          />
        </SwiperSlide>

        <SwiperSlide>
          <ImageCustom
            src="/img/product/banner2.avif"
            alt="Banner 2"
            title="YSL Black Opium"
            desc="A captivating scent blending coffee and vanilla for bold women."
            href="/products/ysl-black-opium"
          />
        </SwiperSlide>

        <SwiperSlide>
          <ImageCustom
            src="/img/product/banner3.avif"
            alt="Banner 3"
            title="Chanel No.5"
            desc="An iconic fragrance representing sophistication and femininity."
            href="/products/chanel-no5"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
