import { Metadata } from 'next';
import PlusBtn from '@/app/ui/icons/plus-btn';
import Link from 'next/link';
import RecipeList from '@/app/ui/dashboard/recipe/recipe-list';

export const metadata: Metadata = {
  title: 'レシピ',
};

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between gap-2 items-center">
        <h1 className="font-bold text-2xl">マイレシピ</h1>
        <Link href="/dashboard/recipe/create">
          <PlusBtn cN={'block w-8 ml-auto'} />
        </Link>
      </div>
      <RecipeList />
    </div>
  );
}
