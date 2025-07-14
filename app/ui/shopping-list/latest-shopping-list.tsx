import { fetchShoppingList } from '@/app/lib/actions/shopping-list-actions';

export async function LatestShoppingList() {
  const shoppingList = await fetchShoppingList(false);

  return (
    <div className="flex flex-col bg-[#ffffff] rounded-2xl">
      {shoppingList?.slice(0, 4).map((item) => (
        <div key={item.id}>
          <div className="flex gap-4 items-center">
            <p className="">{item.name}</p>
            <p className="">...</p>
            <div className="flex gap-1">
              <p className="">{item.amount}</p>
              {item.unit !== 'その他' && <p className="">{item.unit}</p>}
            </div>
          </div>
          <hr className="my-4" />
        </div>
      ))}
    </div>
  );
}
