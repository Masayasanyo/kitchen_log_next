import { Metadata } from 'next';
import { AllRecipeList } from '@/app/ui/recipe/recipe-list';
import LinkBtn from '@/app/ui/linkBtn';
import Search from '@/app/ui/recipe/recipe-search';

export const metadata: Metadata = {
  title: 'レシピ',
};

export default async function Page(props: {
  searchParams?: Promise<{
    type?: string;
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const type = searchParams?.type || '';
  const query = searchParams?.query || '';

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between gap-2 items-center">
        <h1 className="font-bold text-2xl">レシピ一覧</h1>
        <LinkBtn
          link="/dashboard/recipe/create"
          design="w-30
            bg-[#1F4529] text-[#E8ECD7] shadow-[0_4px_0_#32633f] hover:bg-[#32633f] 
            active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
        >
          新規作成
        </LinkBtn>
      </div>
      <Search />
      <div className="flex flex-col gap-8">
        <AllRecipeList type={type} query={query} />
      </div>
    </div>
  );
}
