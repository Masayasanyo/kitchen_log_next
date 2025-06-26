'use client';

import Image from 'next/image';
import Burger from './icons/burger';
import React from 'react';
import Link from 'next/link';

export default function Header(props: { openNav?: () => void }) {
  return (
    <header className="w-full">
      <div className="flex gap-2 items-center py-3">
        <button onClick={props.openNav} className="block p-0 w-8 md:w-10">
          <Burger />
        </button>
        <Link href="/dashboard">
          <Image
            src="/logo.png"
            width={1000}
            height={1000}
            alt="logo"
            className="w-18 md:w-20"
          />
        </Link>
      </div>
    </header>
  );
}
