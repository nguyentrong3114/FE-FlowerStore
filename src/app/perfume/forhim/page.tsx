// src/app/men-perfume/page.tsx
"use client";

import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Perfume {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  notes: string[];
}

export default function MenPerfumePage() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([
    {
      id: 1,
      name: "Bleu de Chanel",
      brand: "Chanel",
      price: 150,
      image: "/img/perfume1.jpg",
      category: "Eau de Parfum",
      notes: ["Woody", "Citrus", "Amber"]
    },
    // Thêm các sản phẩm khác...
  ]);

  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    notes: "all"
  });

  // GSAP Animation
  useEffect(() => {
    gsap.from(".perfume-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, []);

  return (
    <div className="min-h-screen mt-20">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] flex items-center justify-center"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/bannermen1.webp"
            alt="Men's Perfume Collection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center text-white"
        >
          <h1 className="text-5xl font-bold mb-4">Men&apos;s Fragrance Collection</h1>
          <p className="text-xl">Discover your signature scent</p>
        </motion.div>
      </motion.section>

      {/* Filters Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <select 
              className="px-4 py-2 rounded-lg border"
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">All Categories</option>
              <option value="Eau de Parfum">Eau de Parfum</option>
              <option value="Eau de Toilette">Eau de Toilette</option>
            </select>

            <select 
              className="px-4 py-2 rounded-lg border"
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
            >
              <option value="all">All Prices</option>
              <option value="0-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100+">$100+</option>
            </select>

            <select 
              className="px-4 py-2 rounded-lg border"
              onChange={(e) => setFilters({...filters, notes: e.target.value})}
            >
              <option value="all">All Notes</option>
              <option value="Woody">Woody</option>
              <option value="Citrus">Citrus</option>
              <option value="Amber">Amber</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perfumes.map((perfume) => (
              <motion.div
                key={perfume.id}
                className="perfume-card group"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={perfume.image}
                    alt={perfume.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">{perfume.name}</h3>
                  <p className="text-sm text-gray-600">{perfume.brand}</p>
                  <p className="text-lg font-bold mt-2">${perfume.price}</p>
                  <div className="flex gap-2 mt-2">
                    {perfume.notes.map((note, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}