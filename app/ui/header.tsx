'use client'

import Image from 'next/image'
import Burger from "./icons/burger"
import Nav from './nav';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const openNav = () => setNavOpen(!navOpen);

  return (
    <header>
      <div className='flex justify-between items-center py-3'>
        <Link href='/dashboard'>
          <Image 
            src="/logo.png" 
            width={1000} 
            height={1000} 
            alt='logo' 
            className='w-18'
          />
        </Link>
        <Burger openNav={openNav} />
      </div>
      {navOpen && (<Nav openNav={openNav} />)}
    </header>
  );
}