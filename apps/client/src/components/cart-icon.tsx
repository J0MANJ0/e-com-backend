'use client';

import useCartStore from '@/store/cart-store';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CartIcon = () => {
  const { cart, hasHydrated } = useCartStore();

  if (!hasHydrated) return null;
  return (
    <Link href={'/cart'} className='relative'>
      <ShoppingCart className='size-4 text-gray-600' />
      <span className='absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full size-4 flex items-center justify-center text-xs font-medium'>
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </Link>
  );
};

export default CartIcon;
