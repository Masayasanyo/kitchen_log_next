import { Metadata } from 'next';
import ShoppingList from '@/app/ui/shopping-list/all-shopping-list';
import { fetchShoppingList } from '@/app/lib/actions/shopping-list-actions';

export const metadata: Metadata = {
  title: '買い物リスト',
};

export default async function Page() {
  const shoppingList = await fetchShoppingList(false);

  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="font-bold text-2xl">買い物リスト</h1>
      <ShoppingList defaultList={shoppingList} />
    </div>
  );
}
