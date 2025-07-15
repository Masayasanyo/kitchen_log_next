'use client';

import {
  deleteShoppingList,
  fetchShoppingList,
} from '@/app/lib/actions/shopping-list-actions';
import { ShoppingList } from '@/app/lib/definitions';
import { StringSort } from '@/app/lib/string-sort';
import Cancel from '@/app/ui/icons/cancel';

export default function DeleteSLBtn(props: {
  id: number;
  page: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setList: React.Dispatch<React.SetStateAction<ShoppingList[]>>;
}) {
  const deleteSL = async () => {
    try {
      await deleteShoppingList(props.id);
    } catch (error) {
      console.error(error);
      props.setIsError(true);
    } finally {
      const data = await fetchShoppingList(props.page);
      if (data) {
        props.setList(StringSort(data));
      }
    }
  };

  return (
    <button type="button" onClick={deleteSL}>
      <Cancel
        design="w-6 bg-[#CC3300] text-[#E8ECD7] shadow-[0_3px_0_#FF3366] hover:bg-[#FF3366] 
          active:bg-[#FF3366] active:shadow-[0_3px_0_#FF3366]"
      />
    </button>
  );
}
