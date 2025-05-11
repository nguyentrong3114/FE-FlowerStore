'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const products = [
    {
        title: 'AM PERFUME – Elegant Scent',
        description:
            'Hương thơm sang trọng, quyến rũ. Gợi lên mọi giác quan, hoàn hảo cho những khoảnh khắc đặc biệt.',
        price: '$89.99',
        imageUrl:
            'https://kenperfume.com/wp-content/uploads/2024/10/Con-ten-16.png',
        rating: 4.5,
    },
    {
        title: 'AM PERFUME – Floral Fantasy',
        description:
            'Hòa quyện hương hoa tươi mát, đem lại cảm giác thanh khiết và lãng mạn.',
        price: '$79.99',
        imageUrl:
            'https://kenperfume.com/wp-content/uploads/2024/10/Con-ten-16.png',
        rating: 4.5,
    },
    {
        title: 'AM PERFUME – Citrus Burst',
        description:
            'Hương cam chanh sảng khoái, tràn đầy năng lượng cho ngày mới.',
        price: '$69.99',
        imageUrl:
            'https://kenperfume.com/wp-content/uploads/2024/10/Con-ten-16.png',
        rating: 4.5,
    },
];

const Collections: React.FC = () => {
    const { t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);

    // Function to check scroll position
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const scrollThreshold = 300; // You can adjust the threshold to trigger the motion effect

        if (scrollPosition > scrollThreshold) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center justify-center py-10">
                <h2 className="text-3xl font-bold mb-4">{t('newcollections')}</h2>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-xl px-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 50 }}
                    transition={{ duration: 0.5 }}
                >
                    {products.map((product, index) => (
                        <ProductCard

                            key={index}
                            id={index.toString()}
                            title={product.title}
                            price={product.price}
                            imageUrl={product.imageUrl}
                            rating={product.rating}
                        />
                    ))}
                </motion.div>
                <Link href="/products" className="mt-6 text-blue-500 flex items-center">
                    {t('viewall')}
                    <ArrowRight className="ml-2" />
                </Link>
            </div>
        </div>
    );
};

export default Collections;
