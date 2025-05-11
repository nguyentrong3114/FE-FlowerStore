'use client';

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function Banner() {
  const { t } = useLanguage();

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center justify-between">
        
        {/* Bên trái */}
        <div className="max-w-xl text-center md:text-left">
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full mb-4">
            {t("badge")}
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            {t("titleLine1")} <br className="hidden sm:inline-block" />
            <span className="">{t("titleHighlight")}</span>
          </h1>

          <p className="text-lg mb-8">{t("description")}</p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
            <Link href="#">
              <span className="px-6 py-3 text-base font-semibold text-white bg-blue-500 rounded-lg transition cursor-pointer">
                {t("cta")}
              </span>
            </Link>
            <Link href="#">
              <span className="flex items-center text-base font-medium transition cursor-pointer">
                {t("showmore")} <span className="ml-2">→</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Bên phải - Hình ảnh */}
        <div className="mt-16 md:mt-0 md:w-1/2 flex justify-center py-2">
          <div className="relative w-[250px] aspect-square">
            <Image
              src="/img/perfume3.png"
              alt="Perfume Bottle"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
