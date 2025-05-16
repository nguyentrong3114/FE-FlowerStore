/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { ProductService } from "@/services/product.service";
import ProductCard from "@/components/ui/ProductCard";
interface Perfume {
    id: number;
    name: string;
    brandName: string;
    categoryName: string;
    priceMin: number;
    priceMax: number;
    imageUrl: string;
    notes: string[];
}

export default function Products() {
    const [perfumes, setPerfumes] = useState<Perfume[]>([]);
    useEffect(() => {
        ProductService.getAll().then((response: any) => {
            setPerfumes(response.data);
            console.log(response.data);
        });

    }, []);

    return (
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
                    notes={perfume.notes}
                />
            ))}

        </div>
    );
}
