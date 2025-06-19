'use client';

import Link from 'next/link';
import Cancel from './icons/cancel';
import Right from './icons/right';
import { logout } from '@/app/lib/actions';

interface Links {
  name: string;
  href: string;
}

const links: Links[] = [
  { name: 'ホーム', href: '/dashboard' },
  { name: 'レシピ', href: '/dashboard/recipe' },
  { name: '献立', href: '/dashboard/set-meal' },
  // { name: '在庫管理', href: '/' },
  { name: '買い物リスト', href: '/dashboard/shopping-list' },
  // { name: 'みんなのレシピ', href: '/' },
  // { name: 'アカウント', href: '/dashboard/account' },
];

export default function Nav(props: { openNav?: () => void }) {
  return (
    <nav className="fixed top-0 left-0 z-[9999] p-8 bg-[#1F4529] text-[#E8ECD7] w-screen h-screen">
      <Cancel openNav={props.openNav} />
      {links.map((link) => (
        <div key={link.name}>
          <Link
            href={link.href}
            onClick={props.openNav}
            className="flex justify-between py-5 items-center"
          >
            <p>{link.name}</p>
            <Right />
          </Link>
          <hr />
        </div>
      ))}
      <form action={logout} className="flex justify-between py-5">
        <button className="">
          <div>ログアウト</div>
        </button>
        <Right />
      </form>
    </nav>
  );
}
