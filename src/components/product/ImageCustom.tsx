"use client";

import Image from "next/image";

interface ImageCustomProps {
    src: string;
    alt: string;
    title: string;
    desc: string;
    href: string;
}

export default function ImageCustom({ src, alt,title,desc,href }: ImageCustomProps) {
    return (
        <div className="relative w-screen h-[600px]">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
            />

            <div className="absolute top-3/4 left-12 transform -translate-y-1/2 bg-white text-black border-2 rounded-lg p-6 max-w-sm shadow-lg">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="mb-4">
                    {desc}
                </p>
                <a href={href} className="underline font-medium hover:text-blue-500">
                    View Product
                </a>
            </div>
        </div>
    );
}
