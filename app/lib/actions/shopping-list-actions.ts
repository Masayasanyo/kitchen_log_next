'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { supabase } from '@/app/lib/supabase';
import {
  Recipe,
  Ingredient,
  IngRow,
  ShoppingListRow,
} from '@/app/lib/definitions';
import { ZenkakuToHankaku } from '../zenkaku-hankaku';
import { StringSort } from '../string-sort';

async function getUserId() {
  const session = await auth();
  const userIdString: string = session?.user?.id as string;
  const userId = Number(userIdString);

  return userId;
}

export async function fetchShoppingList(isDone: boolean) {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from('shopping_list')
    .select()
    .eq('user_id', userId)
    .eq('progress', isDone);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch shopping list.');
  }

  if (data && data?.length > 0) {
    const convertedData = data.map((row: ShoppingListRow) => ({
      id: row.id,
      userId: row.user_id,
      name: row.name,
      amount: row.amount,
      unit: row.unit,
      progress: row.progress,
    }));

    return StringSort(convertedData);
  }

  return [];
}

async function insertItem(
  userId: number,
  name: string,
  amount: string,
  unit: string,
) {
  const { error } = await supabase.from('shopping_list').insert({
    user_id: userId,
    name: name,
    amount: amount,
    unit: unit,
  });

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add item to shopping list.');
  }
}

async function updateList(id: number, amount: string) {
  const userId = await getUserId();

  const { error } = await supabase
    .from('shopping_list')
    .update({
      amount: amount,
    })
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update shopping list.');
  }
}

export async function create(formData: FormData) {
  const userId = await getUserId();

  let name = formData.get('name') as string;
  let amount = formData.get('amount') as string;
  const unit = formData.get('unit') as string;

  name = ZenkakuToHankaku(name);
  amount = ZenkakuToHankaku(amount);

  const data = await fetchShoppingList(false);

  if (!data || data.length === 0) {
    await insertItem(userId, name, amount, unit);
    return;
  }

  const doesItemExist = data.find(
    (item) => item.name === name && item.unit === unit,
  );

  if (!doesItemExist) {
    await insertItem(userId, name, amount, unit);
    return;
  }

  if (doesItemExist.unit !== unit) {
    await insertItem(userId, name, amount, unit);
    return;
  }

  if (unit === '少々' || unit === '適量') {
    return;
  }

  const newAmount = Number(amount) + Number(doesItemExist.amount);

  if (!isNaN(newAmount)) {
    await updateList(doesItemExist.id, String(newAmount));
    return;
  }

  await insertItem(userId, name, amount, unit);

  redirect('/dashboard/shopping-list');
}

export async function check(id: number) {
  const userId = await getUserId();

  const { error } = await supabase
    .from('shopping_list')
    .update({
      progress: true,
    })
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to check item.');
  }
}

export async function uncheck(id: number) {
  const userId = await getUserId();

  const { error } = await supabase
    .from('shopping_list')
    .update({
      progress: false,
    })
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to uncheck item.');
  }
}

export async function ingToList(name: string, amount: string, unit: string) {
  const userId = await getUserId();

  name = ZenkakuToHankaku(name);
  amount = ZenkakuToHankaku(amount);

  const data = await fetchShoppingList(false);

  if (!data || data.length === 0) {
    await insertItem(userId, name, amount, unit);
    return;
  }

  const doesItemExist = data.find(
    (item) => item.name === name && item.unit === unit,
  );

  if (!doesItemExist) {
    await insertItem(userId, name, amount, unit);
    return;
  }

  if (doesItemExist.unit !== unit) {
    await insertItem(userId, name, amount, unit);
    return;
  }

  if (unit === '少々' || unit === '適量') {
    return;
  }

  const newAmount = Number(amount) + Number(doesItemExist.amount);

  if (!isNaN(newAmount)) {
    await updateList(doesItemExist.id, String(newAmount));
    return;
  }

  await insertItem(userId, name, amount, unit);
}

export async function createFromRecipe(recipeList: Recipe[]) {
  let ingList: Ingredient[] = [];

  for (let i = 0; i < recipeList.length; i++) {
    const { data, error } = await supabase
      .from('ingredients')
      .select()
      .eq('recipe_id', recipeList[i].id);

    if (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to add item to shopping list.');
    }

    if (data && data?.length > 0) {
      const newData = data?.map((row: IngRow) => ({
        id: row.id,
        recipeId: row.recipe_id,
        name: row.name,
        unit: row.unit,
        amount: row.amount,
      }));
      ingList = [...ingList, ...newData];
    }
  }

  ingList = ingList.map((ing) => ({
    ...ing,
    name: ZenkakuToHankaku(ing.name),
    amount: ZenkakuToHankaku(ing.amount),
  }));

  for (let i = 0; i < ingList.length; i++) {
    await ingToList(ingList[i].name, ingList[i].amount, ingList[i].unit);
  }
}

export async function deleteShoppingList(id: number) {
  const userId = await getUserId();

  const { error } = await supabase
    .from('shopping_list')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete item.');
  }
}
