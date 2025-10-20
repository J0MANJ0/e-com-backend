import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className='mt-16 flex flex-col items-center md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 rounded-lg p-8 gap-8'>
      <div className='flex flex-col gap-4 items-center md:items-start'>
        <Link href={'/'} className='flex items-center'>
          <Image src={'/logo.png'} alt='JomaStore' width={36} height={36} />
          <p className='hidden md:block text-md font-medium tracking-wider text-white'>
            JOMA-STORE
          </p>
        </Link>
        <p className='text-sm text-gray-400'>© {year} Joma-Store</p>
        <p className='text-sm text-gray-400'>All rights reserved</p>
      </div>
      <div className='flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start'>
        <p className='text-sm text-amber-50'>Links</p>
        <Link href={'/'}>Home</Link>
        <Link href={'/'}>Contact</Link>
        <Link href={'/'}>Terms of Service</Link>
        <Link href={'/'}>Privacy Policy</Link>
      </div>
      <div className='flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start'>
        <p className='text-sm text-amber-50'>Products</p>
        <Link href={'/'}>All Products</Link>
        <Link href={'/'}>New Arrivals</Link>
        <Link href={'/'}>Best Seller</Link>
        <Link href={'/'}>Sales</Link>
      </div>
      <div className='flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start'>
        <p className='text-sm text-amber-50'>Category</p>
        <Link href={'/'}>About</Link>
        <Link href={'/'}>Contact</Link>
        <Link href={'/'}>Blogs</Link>
        <Link href={'/'}>Affiliate Program</Link>
      </div>
    </div>
  );
};

export default Footer;
