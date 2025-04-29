// src/components/ProductCard.tsx
import React from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  onBuy?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  imageUrl,
  onBuy,
}) => (
  <div className="max-w-sm rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 group ring-1 ring-gray-200 dark:ring-gray-700">
    {/* Hình ảnh */}
    <div className="h-64 overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    {/* Nội dung */}
    <div className="p-6">
      <h2 className="text-2xl font-boldmb-2">
        {title}
      </h2>
      <p className="mb-4 line-clamp-3">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">
          {price}
        </span>
        <button
          onClick={onBuy}
          className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 dark:from-pink-600 dark:to-purple-600 text-white rounded-full shadow-lg hover:from-pink-600 hover:to-purple-600 transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
