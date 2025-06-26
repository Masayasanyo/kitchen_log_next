'use client';

import { deleteShoppingList } from '@/app/lib/actions/shopping-list-actions';
import Trash from '../../icons/trash';

export default function DeleteSLBtn(props: { id: number; page: string }) {
  return (
    <button
      type="submit"
      onClick={() => deleteShoppingList(props.id, props.page)}
    >
      <Trash width="w-6" />
    </button>
  );
}
