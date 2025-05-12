import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  rating?: number;
  description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  imageUrl,
  rating = 0,
  description,
}) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  // const handleWishlistClick = () => {
  //   const product = { id, title, price, imageUrl, rating };
  //   if (isInWishlist(id)) {
  //     removeFromWishlist(id);
  //   } else {
  //     addToWishlist(product);
  //   }
  // };

  // const handleAddToCart = () => {
  //   const product = { id, title, price, imageUrl, rating };
  //   addToCart(product);
  // };

  return (
    <>
      <div className="max-w-sm rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 group ring-1 relative">
        {/* Hình ảnh */}
        <Link href={`/perfume/forhim/${id}`}>
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
              priority={false}
            />
          </div>
        </Link>

        {/* Nội dung */}
        <div className="p-7">
          <Link href={`/perfume/forhim/${id}`}>
            <h2 className="text-xl font-bold mb-2 hover:opacity-80 transition-colors">{title}</h2>
          </Link>

          {/* Hiển thị sao */}
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(fullStars)].map((_, i) => (
              <span key={`full-${i}`}>★</span>
            ))}
            {halfStar && <span>☆</span>}
            {[...Array(emptyStars)].map((_, i) => (
              <span key={`empty-${i}`}>☆</span>
            ))}
            <span className="ml-2 text-sm">({rating.toFixed(1)})</span>
          </div>

          {/* Phần giá và các nút chức năng */}
          <div className="relative h-12">
            {/* Giá tiền */}
            <div className="absolute inset-0 flex items-center justify-between transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
              <span className="text-2xl font-semibold">{price}</span>
            </div>

            {/* Các nút chức năng */}
            <div className="absolute inset-0 flex items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <button
                className="group flex items-center gap-2 px-4 py-2 rounded-full hover:opacity-80 transition-colors"
              >
                <Heart className="w-5 h-5 hover:text-red-500 transition-colors" />
              </button>


              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:opacity-80 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 hover:text-green-500 transition-colors" />
              </button>

              <button
                onClick={() => setIsQuickViewOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:opacity-80 transition-colors"
              >
                <Eye className="w-5 h-5 hover:text-blue-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={{
          id,
          title,
          price,
          imageUrl,
          rating,
          description,
        }}
      />
    </>
  );
};

export default ProductCard;
