'use client';

import { useState } from 'react';
import {
  deleteShoppingList,
  fetchShoppingList,
} from '@/app/lib/actions/shopping-list-actions';
import Trash from '../../icons/trash';
import {
  ShoppingList,
  ShoppingListRow,
} from '@/app/lib/definitions/definitions';
import { StringSort } from '@/app/lib/string-sort';

export default function DeleteSLBtn(props: {
  id: number;
  page: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setList: React.Dispatch<React.SetStateAction<ShoppingList[]>>;
}) {
  const deleteSL = async () => {
    props.setIsPending(true);
    try {
      await deleteShoppingList(props.id);
      const result = await fetchShoppingList(props.page);
      const data = result?.data?.map((row: ShoppingListRow) => ({
        id: row.id,
        userId: row.user_id,
        name: row.name,
        amount: row.amount,
        unit: row.unit,
        progress: row.progress,
      }));
      if (data) {
        props.setList(StringSort(data));
      }
    } catch (error) {
      console.error(error);
      props.setIsError(true);
    } finally {
      props.setIsPending(false);
    }
  };

  return (
    <button type="button" onClick={deleteSL}>
      <Trash width="w-6" />
    </button>
  );
}
