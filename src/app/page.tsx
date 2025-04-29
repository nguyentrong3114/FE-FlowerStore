'use client';
import Banner from "@/components/ui/Banner";
import IntroVideo from "@/components/ui/IntroVideo";
import React from "react";

export default function Home() {


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

      <div className="text-center mt-8">
        <p className="text-lg">
          Enjoy your visit and explore our features!
        </p>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[800px]">
          <Banner />
        </div>
      </div>

    </div>
  );
}
