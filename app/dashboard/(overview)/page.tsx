import { Metadata } from 'next';
import Link from 'next/link';
import ChevronRight from '@/app/ui/icons/chevron-right';
import ReciepList from '@/app/ui/dashboard/overview/recipe-list';
import SetMealList from '@/app/ui/dashboard/overview/set-meal-list';
import ShoppingList from '@/app/ui/dashboard/overview/shopping-list';

export const metadata: Metadata = {
  title: 'ホーム',
};

export default function Page() {
  return (
    <main className="w-full flex flex-col gap-10">
      <section>
        <div className="bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-4 mt-2 md:p-8 md:gap-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">レシピ</h2>
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
        <div className="bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-4 mt-2 md:p-8 md:gap-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">献立</h2>
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
        <div className="bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-4 mt-2 md:p-8 md:gap-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">買い物リスト</h2>
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
