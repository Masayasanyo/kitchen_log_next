import { Metadata } from 'next';
import PlusBtn from '@/app/ui/icons/plus-btn';
import Link from 'next/link';
import SetMealList from '@/app/ui/dashboard/set-meal/set-meal-list';

export const metadata: Metadata = {
  title: '献立',
};

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between gap-2 items-center">
        <h1 className="font-bold text-2xl">献立</h1>
        <Link href="/dashboard/set-meal/create">
          <PlusBtn cN={'block w-8 ml-auto'} />
        </Link>
      </div>
      <SetMealList />
    </div>
  );
}
