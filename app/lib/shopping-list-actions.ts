'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { supabase } from '@/app/lib/supabase';

interface Recipe {
  id: number;
  imgUrl: string;
  title: string;
}

interface Ingredient {
  id: number;
  recipeId: number;
  name: string;
  amount: string;
}

interface Row {
  id: number;
  recipe_id: number;
  name: string;
  amount: string;
}

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

export async function create(formData: FormData) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const name = formData.get('name') as string;
  const amount = formData.get('amount') as string;

  const { error } = await supabase.from('shopping_list').insert({
    user_id: userId,
    name: name,
    amount: amount,
  });
  if (error) {
    console.log(error);
  }

  revalidatePath('/dashboard/shopping-list');
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

export async function createFromSetMeal(recipeList: Recipe[]) {
  const session = await auth();
  const userId: string = session?.user?.id as string;
  let ingList: Ingredient[] = [];

  for (let i = 0; i < recipeList.length; i++) {
    const { data, error } = await supabase
      .from('ingredients')
      .select()
      .eq('recipe_id', recipeList[i].id);
    if (data && data?.length > 0) {
      const newData = data?.map((row: Row) => ({
        id: row.id,
        recipeId: row.recipe_id,
        name: row.name,
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

  for (let i = 0; i < ingList.length; i++) {
    const { error } = await supabase.from('shopping_list').insert({
      user_id: userId,
      name: ingList[i].name,
      amount: ingList[i].amount,
    });
    if (error) {
      console.log(error);
      return {
        message: 'Failed to create shopping list.',
      };
    }
  }

  revalidatePath('/dashboard/shopping-list');
  redirect('/dashboard/shopping-list');
}
