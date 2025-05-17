import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    priceMin: number;
    star: number;
    priceMax: number;
    imageUrl: string;
    description?: string;
  };
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay mờ đen */}
      <div
        className="absolute inset-0 bg-opacity-80 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal nội dung */}
      <div className="relative rounded-lg p-6 max-w-4xl w-full mx-4 border shadow-lg bg-[#eeeeee] z-10">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ảnh */}
          <div className="relative h-96">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Nội dung */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.brand}</p>
            <p className="text-xl font-semibold">{product.priceMin} - {product.priceMax}</p>
            {product.star && (
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < (product.star || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm">({product.star.toFixed(1)})</span>
              </div>
            )}
            {product.description && (
              <p className="text-gray-800">{product.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
