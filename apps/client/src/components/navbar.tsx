import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SearchBar from './search-bar';
import { Bell, Home } from 'lucide-react';
import CartIcon from './cart-icon';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import ProfileButton from './profile-button';

const Navbar = () => {
  return (
    <nav className='w-full flex items-center justify-between border-b border-gray-200 pb-4'>
      <Link href={'/'} className='flex items-center'>
        <Image
          src={'/logo.png'}
          alt='JomaStore'
          width={36}
          height={36}
          className='size-6 md:size-9'
        />
        <p className='hidden md:block text-md font-medium tracking-wider'>
          JOMA-STORE
        </p>
      </Link>
      <div className='flex items-center gap-6'>
        <SearchBar />
        <Link href={'/'}>
          <Home className='size-4 text-gray-600' />
        </Link>
        <Bell className='size-4 text-gray-600' />
        <CartIcon />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <ProfileButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
