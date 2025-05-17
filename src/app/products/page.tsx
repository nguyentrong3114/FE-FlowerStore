/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { ProductService } from "@/services/product.service";
import ProductCard from "@/components/ui/ProductCard";

interface Perfume {
    id: number;
    name: string;
    brandName: string;
    star: number;
    categoryName: string;
    priceMin: number;
    priceMax: number;
    imageUrl: string;
    notes: string[];
}

export default function Products() {
    const [perfumes, setPerfumes] = useState<Perfume[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ProductService.getAll()
            .then((response: any) => {
                setPerfumes(response.data);
                console.log(response.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="h-64 bg-gray-300 rounded-2xl mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 mt-20">
                {perfumes.map(perfume => (
                    <ProductCard
                        key={perfume.id}
                        id={perfume.id.toString()}
                        title={perfume.name}
                        priceMin={perfume.priceMin}
                        priceMax={perfume.priceMax}
                        imageUrl={perfume.imageUrl}
                        brand={perfume.brandName}
                        star={perfume.star}
                        notes={perfume.notes}
                    />
                ))}
            </div>
        </div>
    );
}
