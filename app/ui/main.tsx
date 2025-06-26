'use client';

import Nav from './nav';
import React, { useState } from 'react';
import Header from '@/app/ui/header';

export default function Main({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  const openNav = () => setNavOpen(!navOpen);

  return (
    <div>
      <Header openNav={openNav} />
      <div className="flex gap-2">
        {navOpen && <Nav isOpen={navOpen} openNav={openNav} />}
        {children}
      </div>
    </div>
  );
}
