import { ShoppingList } from '@/app/lib/definitions';

export function StringSort(ShoppingList: ShoppingList[]) {
  const sortedList = ShoppingList.sort((a, b) => a.name.localeCompare(b.name));
  return sortedList;
}
