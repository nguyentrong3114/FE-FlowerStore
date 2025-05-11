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
    href: string;
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
            image: "https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_1020/bleu-de-chanel-eau-de-parfum-spray-3-4fl-oz--packshot-default-107360-9564894232606.jpg",
            category: "Eau de Parfum",
            href: "/perfume/forher/:chanel01",
            notes: ["Woody", "Citrus", "Amber"]
        },
    ]);

    const [filters, setFilters] = useState({
        category: "all",
        priceRange: "all",
        notes: "all"
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [isLoading, setIsLoading] = useState(true);

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
                    <div className="absolute inset-0" />
                </div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10 text-center "
                >
                    <h1 className="text-5xl font-bold mb-4 text-white">Men&apos;s Fragrance Collection</h1>
                    <p className="text-xl text-white">Discover your signature scent</p>
                </motion.div>
            </motion.section>

            {/* Filters Section */}
            <section className="py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <select
                            className="px-4 py-2 rounded-lg border"
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        >
                            <option value="all">All Categories</option>
                            <option value="Eau de Parfum">Eau de Parfum</option>
                            <option value="Eau de Toilette">Eau de Toilette</option>
                        </select>

                        <select
                            className="px-4 py-2 rounded-lg border"
                            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                        >
                            <option value="all">All Prices</option>
                            <option value="0-50">Under $50</option>
                            <option value="50-100">$50 - $100</option>
                            <option value="100+">$100+</option>
                        </select>

                        <select
                            className="px-4 py-2 rounded-lg border"
                            onChange={(e) => setFilters({ ...filters, notes: e.target.value })}
                        >
                            <option value="all">All Notes</option>
                            <option value="Woody">Woody</option>
                            <option value="Citrus">Citrus</option>
                            <option value="Amber">Amber</option>
                        </select>

                        <select
                            className="px-4 py-2 rounded-lg border"
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="name">Sort by price</option>
                            <option value="price-asc">Low to High</option>
                            <option value="price-desc">High to Low</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search perfumes..."
                            className="px-4 py-2 rounded-lg border"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {isLoading && (
                        <div className="animate-pulse">
                            {/* Skeleton UI */}
                        </div>
                    )}
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
                                    <p className="text-sm ">{perfume.brand}</p>
                                    <p className="text-lg font-bold mt-2">${perfume.price}</p>
                                    <div className="flex gap-2 mt-2">
                                        {perfume.notes.map((note, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs rounded-full "
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