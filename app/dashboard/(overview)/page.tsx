import { Metadata } from 'next';
import ChevronRight from '@/app/ui/icons/chevron-right';
import { LatestRecipeList } from '@/app/ui/recipe/recipe-list';
import { LatestSetMealList } from '@/app/ui/set-meal/set-meal-list';
import { LatestShoppingList } from '@/app/ui/shopping-list/latest-shopping-list';
import LinkBtn from '@/app/ui/linkBtn';
import {
  RecipesSkeleton,
  SetMealsSkeleton,
  ShoppingListSkeleton,
} from '@/app/ui/skeletons';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'ホーム',
};

export default function Page() {
  return (
    <main className="w-full flex flex-col gap-10">
      <section className="bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-8 md:p-8 md:gap-6">
        <h2 className="text-2xl md:text-3xl font-bold">レシピ</h2>
        <Suspense fallback={<RecipesSkeleton />}>
          <LatestRecipeList />
        </Suspense>
        <LinkBtn
          link={'/dashboard/recipe'}
          design="w-40
            px-6 py-2 rounded-2xl font-bold active:translate-y-1
            bg-[#1F4529] text-[#E8ECD7] shadow-[0_4px_0_#32633f] hover:bg-[#32633f]
            active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
        >
          <div className="flex gap-1 items-center justify-center">
            <ChevronRight />
            もっと見る
          </div>
        </LinkBtn>
      </section>

      <section className="bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-8 md:p-8 md:gap-6">
        <h2 className="text-2xl md:text-3xl font-bold">献立</h2>
        <Suspense fallback={<SetMealsSkeleton />}>
          <LatestSetMealList />
        </Suspense>
        <LinkBtn
          link={'/dashboard/set-meal'}
          design="w-40
            px-6 py-2 rounded-2xl font-bold active:translate-y-1
            bg-[#1F4529] text-[#E8ECD7] shadow-[0_4px_0_#32633f] hover:bg-[#32633f]
            active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
        >
          <div className="flex gap-1 items-center justify-center">
            <ChevronRight />
            もっと見る
          </div>
        </LinkBtn>
      </section>

      <section className="bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-8 md:p-8 md:gap-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">買い物リスト</h2>
        <Suspense fallback={<ShoppingListSkeleton />}>
          <LatestShoppingList />
        </Suspense>
        <LinkBtn
          link={'/dashboard/shopping-list'}
          design="w-40
            px-6 py-2 rounded-2xl font-bold active:translate-y-1
            bg-[#1F4529] text-[#E8ECD7] shadow-[0_4px_0_#32633f] hover:bg-[#32633f]
            active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
        >
          <div className="flex gap-1 items-center justify-center">
            <ChevronRight />
            もっと見る
          </div>
        </LinkBtn>
      </section>
    </main>
  );
}
