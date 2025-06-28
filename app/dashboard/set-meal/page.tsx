import { Metadata } from 'next';
import SetMealList from '@/app/ui/dashboard/set-meal/set-meal-list';
import LinkBtn from '@/app/ui/linkBtn';

export const metadata: Metadata = {
  title: '献立',
};

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between gap-2 items-center">
        <h1 className="font-bold text-2xl">献立</h1>
        <LinkBtn
          link="/dashboard/set-meal/create"
          design="w-30 bg-[#1F4529] text-[#E8ECD7] shadow-[0_4px_0_#32633f] 
            hover:bg-[#32633f] active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
        >
          新規作成
        </LinkBtn>
      </div>
      <SetMealList />
    </div>
  );
}
