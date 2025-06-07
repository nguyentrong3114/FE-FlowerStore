'use client';

import api from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/product/ProductCard';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/products/search?query=${encodeURIComponent(query)}`);
        setProducts(res.data);
        console.log(res.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message || 'Đã có lỗi xảy ra khi tìm kiếm sản phẩm.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="container mx-auto py-8 mt-20">
      <h1 className="text-2xl font-bold mb-4">Kết quả cho: &quot;{query}&quot;</h1>

      {loading && <p>Đang tìm kiếm...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && products.length === 0 && <p>Không tìm thấy sản phẩm nào.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard  key={product.id} star={product.star} description={product.name} imageUrl={product.imageUrl} title={product.name} brand={product.brandName} priceMin={product.minPrice} priceMax={product.maxPrice} id={product.id} notes={[]} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
