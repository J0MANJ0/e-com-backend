'use client';

import useCartStore from '@/store/cart-store';
import { ProductType } from '@repo/types';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ProductCard = ({ product }: { product: ProductType }) => {
  const [ProductTypes, setProductTypes] = useState({
    size: product.sizes[0]!,
    color: product.colors[0]!,
  });

  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: ProductTypes.size,
      selectedColor: ProductTypes.color,
    });
    toast.success('Product added to Cart');
  };

  const handleProductType = ({
    type,
    value,
  }: {
    type: 'size' | 'color';
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };
  return (
    <div className='shadow-lg rounded-lg overflow-hidden'>
      <Link href={`/products/${product.id}`}>
        <div className='relative aspect-[2/3]'>
          <Image
            src={
              (product.images as Record<string, string>)?.[
                ProductTypes.color
              ] || ''
            }
            alt={product.name}
            fill
            className='object-cover hover:scale-105 transition duration-300'
          />
        </div>
      </Link>
      <div className='flex flex-col gap-4 p-4'>
        <h2 className='font-medium'>{product.name}</h2>
        <p className='text-sm text-gray-500'>{product.shortDescription}</p>
        <div className='flex items-center gap-4 text-xs'>
          <div className='flex flex-col gap-1'>
            <span className='text-gray-500'>Size</span>
            <select
              name='size'
              id='size'
              className='ring ring-gray-300 px-2 py-1 rounded-md'
              onChange={(e) =>
                handleProductType({ type: 'size', value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option value={size} key={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-gray-500'>Colors</span>
            <div className='flex items-center gap-2'>
              {product.colors.map((color) => (
                <div
                  key={color}
                  onClick={() =>
                    handleProductType({ type: 'color', value: color })
                  }
                  className={`cursor-pointer border-1 ${
                    ProductTypes.color === color
                      ? 'border-gray-400'
                      : 'border-gray-200'
                  } rounded-full p-[1.2px]`}
                >
                  <div
                    className='size-[14px] rounded-full'
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <p className='font-medium'>${product.price.toFixed(2)}</p>
          <button
            className='ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex gap-2 items-center'
            onClick={handleAddToCart}
          >
            <ShoppingCart className='size-4' />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
