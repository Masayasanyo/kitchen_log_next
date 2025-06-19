import { Metadata } from 'next';
import ShoppingList from '@/app/ui/dashboard/shopping-list/shopping-list';
import Create from '@/app/ui/dashboard/shopping-list/create';

export const metadata: Metadata = {
  title: '買い物リスト',
};

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="font-bold text-2xl">買い物リスト</h1>
      <Create />
      <ShoppingList />
    </div>
  );
}
