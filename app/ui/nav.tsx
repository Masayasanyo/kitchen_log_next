'use client';

import Link from 'next/link';
import { logout } from '@/app/lib/actions/account-actions';
import { Links } from '@/app/lib/definitions';
import CardChecklist from '@/app/ui/icons/card-checklist';
import Folder from '@/app/ui/icons/folder';
import ForkKnife from '@/app/ui/icons/fork-knife';
import Home from '@/app/ui/icons/home';
import BoxArrowRight from './icons/box-arrow-right';

const links: Links[] = [
  { name: 'ホーム', href: '/dashboard', icon: Home, width: 'w-6' },
  { name: 'レシピ', href: '/dashboard/recipe', icon: ForkKnife, width: 'w-6' },
  { name: '献立', href: '/dashboard/set-meal', icon: Folder, width: 'w-6' },
  {
    name: '買い物リスト',
    href: '/dashboard/shopping-list',
    icon: CardChecklist,
    width: 'w-6',
  },
];

export default function Nav(props: { isOpen: boolean; openNav?: () => void }) {
  return (
    <nav className="bg-[#1F4529] text-[#E8ECD7] w-100 rounded-2xl px-6 py-8 transition-all duration-500 ease-in-out">
      {links.map((link) => (
        <div key={link.name}>
          <Link
            href={link.href}
            onClick={props.openNav}
            className="flex gap-4 py-5 items-center"
          >
            <link.icon width={link.width} />
            <p className="font-bold">{link.name}</p>
          </Link>
          <hr />
        </div>
      ))}
      <form action={logout} className="">
        <button className="flex gap-4 py-5 items-center">
          <BoxArrowRight width="w-6" />
          <div className="font-bold">ログアウト</div>
        </button>
      </form>
    </nav>
  );
}
