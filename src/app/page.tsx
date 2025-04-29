'use client';
import Banner from "@/components/ui/Banner";
import Collections from "@/components/ui/Collections";
import IntroVideo from "@/components/ui/IntroVideo";
import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>

      {/* Video centered */}
      <div className="w-full flex justify-center mb-8 ">

        <div className="w-2/3 mt-2">
          <IntroVideo
            videoUrl="/videos/intro.mp4"
            poster="/images/intro-poster.jpg"
            altText="Introductory Video"
          />
        </div>
      </div>

      <div className="text-center my-8 text-2xl font-bold">
        <h2 className="text-lg">
          {t("slogan")}
        </h2>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[800px]">
          <Banner />
        </div>
      </div>
    <Collections/>
    </div>
  );
}
