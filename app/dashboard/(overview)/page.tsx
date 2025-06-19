import { Metadata } from 'next';
import Link from 'next/link';
import ChevronRight from '@/app/ui/icons/chevron-right';
import ReciepList from '@/app/ui/dashboard/overview/recipe-list';
import SetMealList from '@/app/ui/dashboard/overview/set-meal-list';
import ShoppingList from '@/app/ui/dashboard/overview/shopping-list';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Page() {
  return (
    <main className="flex flex-col gap-8">
      <section>
        <h2 className="text-2xl font-medium">レシピ</h2>
        <div className="bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-4 mt-2">
          <ReciepList />
          <Link
            href={'dashboard/recipe'}
            className="flex gap-1 items-center justify-center"
          >
            <ChevronRight />
            もっと見る
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium">献立</h2>
        <div className="bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-4 mt-2">
          <SetMealList />
          <Link
            href={'dashboard/set-meal'}
            className="flex gap-1 items-center justify-center"
          >
            <ChevronRight />
            もっと見る
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium">買い物リスト</h2>
        <div className="bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-4 mt-2">
          <ShoppingList />
          <Link
            href={'dashboard/shopping-list'}
            className="flex gap-1 items-center justify-center"
          >
            <ChevronRight />
            もっと見る
          </Link>
        </div>
      </section>
    </main>
  );
}
