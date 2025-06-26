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
} from '@/app/lib/definitions/definitions';
import { ZenkakuToHankaku } from '../zenkaku-hankaku';

export async function fetchShoppingList(isDone: boolean) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const { data, error } = await supabase
    .from('shopping_list')
    .select()
    .eq('user_id', userId)
    .eq('progress', isDone);
  if (!data || data?.length < 0) {
    return { message: 'Set meals not found.' };
  }
  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to fetch set meal.',
    };
  }

  return {
    message: 'Shopping list retrieved successfully.',
    data: data,
  };
}

async function addList(
  userId: string,
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
    console.log(error);
  }

  revalidatePath('/dashboard/shopping-list');
}

async function updateList(id: number, amount: string) {
  const { error } = await supabase
    .from('shopping_list')
    .update({
      amount: amount,
    })
    .eq('id', id);
  if (error) {
    console.log(error);
    return;
  }

  revalidatePath('/dashboard/shopping-list');
}

export async function create(formData: FormData) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  let name = formData.get('name') as string;
  let amount = formData.get('amount') as string;
  const unit = formData.get('unit') as string;

  name = ZenkakuToHankaku(name);
  amount = ZenkakuToHankaku(amount);

  const result = await fetchShoppingList(false);
  const data = result?.data?.map((row: ShoppingListRow) => ({
    id: row.id,
    userId: row.user_id,
    name: row.name,
    amount: row.amount,
    unit: row.unit,
    progress: row.progress,
  }));

  if (!data || data.length === 0) {
    await addList(userId, name, amount, unit);
    return;
  }

  const doesItemExist = data.find(
    (item) => item.name === name && item.unit === unit,
  );

  if (!doesItemExist) {
    await addList(userId, name, amount, unit);
    return;
  }

  if (doesItemExist.unit !== unit) {
    await addList(userId, name, amount, unit);
    return;
  }

  if (unit === '少々' || unit === '適量') {
    return;
  }

  const newAmount = Number(amount) + Number(doesItemExist.amount);

  console.log(newAmount);

  if (!isNaN(newAmount)) {
    await updateList(doesItemExist.id, String(newAmount));
    return;
  }

  await addList(userId, name, amount, unit);

  redirect('/dashboard/shopping-list');
}

export async function check(id: number) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const { error } = await supabase
    .from('shopping_list')
    .update({
      progress: true,
    })
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to edit shopping list.',
    };
  }
}

export async function uncheck(id: number) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const { error } = await supabase
    .from('shopping_list')
    .update({
      progress: false,
    })
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to edit shopping list.',
    };
  }
}

export async function ingToList(name: string, amount: string, unit: string) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  name = ZenkakuToHankaku(name);
  amount = ZenkakuToHankaku(amount);

  const result = await fetchShoppingList(false);
  const data = result?.data?.map((row: ShoppingListRow) => ({
    id: row.id,
    userId: row.user_id,
    name: row.name,
    amount: row.amount,
    unit: row.unit,
    progress: row.progress,
  }));

  if (!data || data.length === 0) {
    await addList(userId, name, amount, unit);
    return;
  }

  const doesItemExist = data.find(
    (item) => item.name === name && item.unit === unit,
  );

  if (!doesItemExist) {
    await addList(userId, name, amount, unit);
    return;
  }

  if (doesItemExist.unit !== unit) {
    await addList(userId, name, amount, unit);
    return;
  }

  if (unit === '少々' || unit === '適量') {
    return;
  }

  const newAmount = Number(amount) + Number(doesItemExist.amount);

  console.log(newAmount);

  if (!isNaN(newAmount)) {
    await updateList(doesItemExist.id, String(newAmount));
    return;
  }

  await addList(userId, name, amount, unit);
}

export async function createFromSetMeal(recipeList: Recipe[]) {
  let ingList: Ingredient[] = [];

  for (let i = 0; i < recipeList.length; i++) {
    const { data, error } = await supabase
      .from('ingredients')
      .select()
      .eq('recipe_id', recipeList[i].id);
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
    if (error) {
      console.log(error);
      return {
        message: 'Failed to create shopping list.',
      };
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

  revalidatePath('/dashboard/shopping-list');
  redirect('/dashboard/shopping-list');
}

export async function deleteShoppingList(id: number, page: string) {
  const { error } = await supabase.from('shopping_list').delete().eq('id', id);
  if (error) {
    console.log(error);
  }

  if (page === 'undone') {
    revalidatePath(`/dashboard/shopping-list`);
    redirect(`/dashboard/shopping-list`);
  }

  if (page === 'done') {
    revalidatePath(`/dashboard/shopping-list/done`);
    redirect(`/dashboard/shopping-list/done`);
  }
}
