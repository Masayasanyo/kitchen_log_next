import { Metadata } from 'next';
import Done from '@/app/ui/shopping-list/done';
import { fetchShoppingList } from '@/app/lib/actions/shopping-list-actions';

export const metadata: Metadata = {
  title: '購入済み',
};

export default async function Page() {
  const shoppingList = await fetchShoppingList(true);

  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="font-bold text-2xl">購入済み</h1>
      <Done defaultList={shoppingList} />
    </div>
  );
}
