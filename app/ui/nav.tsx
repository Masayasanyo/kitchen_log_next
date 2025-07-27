'use client';

import Link from 'next/link';
import { logout } from '@/app/lib/actions/account-actions';
import { Links } from '@/app/lib/definitions';
import CardChecklist from '@/app/ui/icons/card-checklist';
import Folder from '@/app/ui/icons/folder';
import ForkKnife from '@/app/ui/icons/fork-knife';
import Home from '@/app/ui/icons/home';
import BoxArrowRight from '@/app/ui/icons/box-arrow-right';
import Calendar from '@/app/ui/icons/calendar';
import CancelBtn from '@/app/ui/icons/cancel-btn';

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
  {
    name: 'カレンダー',
    href: '/dashboard/calendar',
    icon: Calendar,
    width: 'w-6',
  },
];

export default function Nav(props: { isOpen: boolean; openNav?: () => void }) {
  return (
    <>
      <div
        className={`fixed w-full h-full bg-[rgba(0,0,0,.5)] 
          top-0 left-0 z-1000`}
      ></div>
      <nav
        className={`fixed top-0 left-0 z-1100 w-75 h-screen bg-[#1F4529] 
        text-[#E8ECD7] rounded-r-2xl 
        px-8 py-10 transition-all duration-500 ease-in-out md:w-100`}
      >
        <button
          type="button"
          className="ml-auto block mb-4"
          onClick={props.openNav}
        >
          <CancelBtn fillColor={'#E8ECD7'} cN={'w-5 block ml-auto'} />
        </button>
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
    </>
  );
}
