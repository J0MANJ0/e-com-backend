import ProductList from '@/components/product-list';
import React from 'react';

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div>
      <ProductList category={category} params='productspage' />
    </div>
  );
};

export default ProductPage;
