'use client';

import Link from 'next/link';
import Cancel from './icons/cancel';
import Right from './icons/right';
import { logout } from '@/app/lib/actions/account-actions';
import { Links } from '@/app/lib/definitions/definitions';

const links: Links[] = [
  { name: 'ホーム', href: '/dashboard' },
  { name: 'レシピ', href: '/dashboard/recipe' },
  { name: '献立', href: '/dashboard/set-meal' },
  { name: '買い物リスト', href: '/dashboard/shopping-list' },
];

export default function Nav(props: { openNav?: () => void }) {
  return (
    // <nav className="fixed top-0 left-0 z-[9999] p-8 bg-[#1F4529] text-[#E8ECD7] w-screen h-screen md:left-auto md:right-0 md:w-xl">
    <nav className="bg-[#1F4529] text-[#E8ECD7] w-[60%] rounded-2xl p-4">
      {links.map((link) => (
        <div key={link.name}>
          <Link
            href={link.href}
            onClick={props.openNav}
            className="flex justify-between py-5 items-center"
          >
            <p>{link.name}</p>
          </Link>
          <hr />
        </div>
      ))}
      <form action={logout} className="flex justify-between py-5">
        <button className="">
          <div>ログアウト</div>
        </button>
      </form>
    </nav>
  );
}
