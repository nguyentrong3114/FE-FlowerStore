import React from 'react';

interface ProductCardProps {
  title: string;
  price: string;
  imageUrl: string;
  rating?: number; // Thêm rating
  onBuy?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  imageUrl,
  rating = 0,
  onBuy,
}) => {
  // Tạo mảng sao
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
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
      <div className="p-7">
        <h2 className="text-xl font-bold mb-2">{title}</h2>

        {/* Hiển thị sao */}
        <div className="flex items-center space-x-1 mb-4 text-yellow-500">
          {[...Array(fullStars)].map((_, i) => (
            <span key={`full-${i}`}>★</span>
          ))}
          {halfStar && <span>☆</span>}
          {[...Array(emptyStars)].map((_, i) => (
            <span key={`empty-${i}`}>☆</span>
          ))}
          <span className="ml-2 text-gray-500 text-sm">({rating.toFixed(1)})</span>
        </div>

        <div className="flex pt-4 items-center justify-between">
          <span className="text-2xl font-semibold">{price}</span>
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
};

export default ProductCard;
