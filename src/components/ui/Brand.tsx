"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <section className="py-16">
      <motion.h2
        className="text-center text-2xl md:text-3xl font-bold mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        TRENDING BRANDS
      </motion.h2>

      <motion.div
        className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-lg sm:text-xl font-semibold px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {brands.map((brand, idx) => (
          <Link
            key={idx}
            href={brand.href}
            className={`whitespace-nowrap transition-all duration-300 hover:scale-105 transform ${
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
      </motion.div>
    </section>
  );
}
