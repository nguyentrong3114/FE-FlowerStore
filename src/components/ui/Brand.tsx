"use client";
import Link from "next/link";
import { useState } from "react";
const brands = [
    { name: "CHANEL", href: "/brands/chanel" },
    { name: "DIOR", href: "/brands/dior" },
    { name: "BOSS", href: "/brands/boss" },
    { name: "AZZARO", href: "/brands/azzaro" },
    { name: "Jean Paul GAULTIER", href: "/brands/gaultier" },
    { name: "MUGLER", href: "/brands/mugler" },
    { name: "YVES SAINT LAURENT", href: "/brands/ysl" },
    { name: "rabanne", href: "/brands/rabanne" },
    { name: "GUCCI", href: "/brands/gucci" }
  ];
  
export default function Brand() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-8">
      <h2 className="text-center text-2xl font-bold mb-6">TRENDING BRANDS</h2>
      <div className="flex flex-wrap justify-center items-center gap-8 text-xl font-semibold">
        {brands.map((brand, idx) => (
          <Link
            key={idx}
            href={brand.href}
            className={`whitespace-nowrap transition-opacity duration-300 hover:scale-105 transform ${
              hoveredIndex === null || hoveredIndex === idx
                ? "opacity-100"
                : "opacity-30"
            }`}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {brand.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
