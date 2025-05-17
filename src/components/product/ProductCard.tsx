import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import QuickViewModal from '@/components/product/QuickViewModal';

interface ProductCardProps {
  id: string;
  title: string;
  imageUrl: string;
  brand: string;
  notes: string[];
  priceMin: number;
  priceMax: number;
  star: number;
  description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  imageUrl,
  brand,
  priceMin,
  priceMax,
  star,
  description,
}) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const validatedStar = Number.isFinite(star) ? Math.max(0, Math.min(5, star)) : 0;
  const fullStars = Math.floor(validatedStar);
  const halfStar = validatedStar % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);


  const priceDisplay =
    priceMin && priceMax
      ? priceMin === priceMax
        ? `$${priceMin}`
        : `$${priceMin} - $${priceMax}`
      : 'Liên hệ';

  return (
    <>
      <div className="max-w-sm rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 group ring-1 relative">
        <Link href={`/products/${id}`}>
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={!imgError && imageUrl ? imageUrl : '/img/product/404image.webp'}
              alt={title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              onError={() => setImgError(true)}
              className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </Link>

        <div className="p-7">
          <Link href={`/perfume/forher/${id}`}>
            <h2 className="text-xl font-bold mb-2 hover:opacity-80 transition-colors">
              {title}
            </h2>
            <p className="text-sm text-gray-600">{brand}</p>
          </Link>

          <div className="flex items-center space-x-1 mb-4">
            {[...Array(fullStars)].map((_, i) => (
              <span key={`full-${i}`}>★</span>
            ))}
            {halfStar && <span>☆</span>}
            {[...Array(emptyStars)].map((_, i) => (
              <span key={`empty-${i}`}>☆</span>
            ))}
            <span className="ml-2 text-sm">
              ({Number.isFinite(star) ? star.toFixed(1) : "0.0"})
            </span>

          </div>

          <div className="relative h-12">
            <div className="absolute inset-0 flex items-center justify-between transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
              <span className="text-2xl font-semibold">{priceDisplay}</span>
            </div>

            <div className="absolute inset-0 flex items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <button className="group flex items-center gap-2 px-4 py-2 rounded-full hover:opacity-80 transition-colors">
                <Heart className="w-5 h-5 hover:text-red-500 transition-colors" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:opacity-80 transition-colors">
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

      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={{
          id,
          title,
          priceMin,
          priceMax,
          imageUrl,
          star,
          description,
        }}
      />
    </>
  );
};

export default ProductCard;
