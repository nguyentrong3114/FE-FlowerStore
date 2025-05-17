"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import { ProductService } from "@/services/product.service";
import ProductCard from "@/components/product/ProductCard";
interface Perfume {
    id: number;
    name: string;
    brandName: string;
    categoryName: string;
    priceMin: number;
    star: number;
    priceMax: number;
    imageUrl: string;
    notes: string[];
}

export default function MenPerfumePage() {
    const [perfumes, setPerfumes] = useState<Perfume[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: "all",
        priceRange: "all",
        notes: "all",
        gender: "Female"
    });

    useEffect(() => {
        const fetchPerfumes = async () => {
            try {
                const response = await ProductService.getFiltered(filters);
                setPerfumes(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Lỗi khi tải nước hoa:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfumes();
    }, [filters]);

    useEffect(() => {
        gsap.from(".perfume-card", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }, [perfumes]);
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 mt-20">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="h-64 bg-gray-300 rounded-2xl mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }
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
                    <h1 className="text-5xl font-bold mb-4">Her&apos;s Fragrance Collection</h1>
                    <p className="text-xl">Discover your signature scent</p>
                </motion.div>
            </motion.section>

            {/* Filters */}
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
                            <option value="100+">Above $100</option>
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
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {perfumes.map((perfume) => (
                            <ProductCard
                                key={perfume.id}
                                star={perfume.star}
                                id={perfume.id.toString()}
                                title={perfume.name}
                                priceMin={perfume.priceMin}
                                priceMax={perfume.priceMax}
                                imageUrl={perfume.imageUrl}
                                brand={perfume.brandName}
                                notes={perfume.notes}
                            />
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}
