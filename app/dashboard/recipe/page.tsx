import { Metadata } from 'next';
import PlusBtn from '@/app/ui/dashboard/recipe/plus-btn';
import Link from 'next/link';
import RecipeList from '@/app/ui/dashboard/recipe/recipe-list';

export const metadata: Metadata = {
  title: 'レシピ',
};

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="font-bold text-2xl">マイレシピ</h1>
      <div className="flex justify-between gap-2 items-center">
        <input
          className="bg-[#ffffff] p-2 rounded-2xl w-full"
          id="search"
          placeholder="検索"
        />
        <Link href="/dashboard/recipe/create">
          <PlusBtn />
        </Link>
      </div>
      <RecipeList />
    </div>
  );
}
