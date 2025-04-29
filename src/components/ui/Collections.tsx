// src/components/Collections.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRightLeft, ArrowRight } from 'lucide-react';

const products = [
    {
        title: 'AM PERFUME – Elegant Scent',
        description:
            'Hương thơm sang trọng, quyến rũ. Gợi lên mọi giác quan, hoàn hảo cho những khoảnh khắc đặc biệt.',
        price: '$89.99',
        imageUrl:
            'https://kenperfume.com/wp-content/uploads/2024/10/Con-ten-16.png',
    },
    {
        title: 'AM PERFUME – Floral Fantasy',
        description:
            'Hòa quyện hương hoa tươi mát, đem lại cảm giác thanh khiết và lãng mạn.',
        price: '$79.99',
        imageUrl:
            'https://kenperfume.com/wp-content/uploads/2024/10/Con-ten-16.png',
    },
    {
        title: 'AM PERFUME – Citrus Burst',
        description:
            'Hương cam chanh sảng khoái, tràn đầy năng lượng cho ngày mới.',
        price: '$69.99',
        imageUrl:
            'https://kenperfume.com/wp-content/uploads/2024/10/Con-ten-16.png',
    },
];

const Collections: React.FC = () => {
    const { t } = useLanguage();
    const [showExtra, setShowExtra] = useState(false);

    const toggleShow = () => setShowExtra(prev => !prev);

    return (
        <section className="p-4 rounded-2xl">
            {/* Header with navigation */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-extrabold">
                    {t('newcollections')}
                </h1>
                {/* View All button navigates to /collections page */}
                <Link
                    href="/collections"
                    className="text-lg font-medium text-blue-600 hover:text-blue-800 flex items-center"
                >
                    {t('viewall')}<ArrowRight className="w-5 h-5 ml-1" />
                </Link>
            </div>

            {/* Main display: first product + toggle button */}
            <div className="flex flex-wrap gap-6 items-start relative">
                <div className="relative w-full sm:w-[48%] lg:w-[32%]">
                    <ProductCard
                        title={products[0].title}
                        description={products[0].description}
                        price={products[0].price}
                        imageUrl={products[0].imageUrl}
                        onBuy={() => alert(`Added ${products[0].title} to cart!`)}
                    />
                   
                    <button
                        onClick={toggleShow}
                        className="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full shadow-lg transition-colors flex items-center justify-center"
                    >
                        <ArrowRightLeft
                            size={40}
                            className={`transition-colors ${showExtra ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'}`}
                        />
                    </button>
                </div>

                {/* Extra products slide in from right */}
                {showExtra && (
                    <div className="flex flex-wrap gap-6 animate-slide-in-right">
                        {products.slice(1).map(product => (
                            <div key={product.title} className="w-full sm:w-[48%] lg:w-[32%]">
                                <ProductCard
                                    title={product.title}
                                    description={product.description}
                                    price={product.price}
                                    imageUrl={product.imageUrl}
                                    onBuy={() => alert(`Added ${product.title} to cart!`)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Animation CSS */}
                <style jsx>{`
                    @keyframes slideInRight {
                        from { transform: translateX(50px); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    .animate-slide-in-right {
                        animation: slideInRight 0.5s ease-out;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default Collections;
