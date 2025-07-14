'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  SetMealForm,
  SetMealRow,
  SetMealInfoRow,
  RecipeListRow,
} from '@/app/lib/definitions';
import { auth } from '@/auth';
import { supabase } from '@/app/lib/supabase';

async function getUserId() {
  const session = await auth();
  const userIdString: string = session?.user?.id as string;
  const userId = Number(userIdString);

  return userId;
}

export async function fetchSetMeals() {
  const userId = await getUserId();

  let setMealList = [];

  const { data, error } = await supabase
    .from('set_meals')
    .select()
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch set meals.');
  }

  if (data && data?.length > 0) {
    setMealList = data;
  }

  for (let i = 0; i < setMealList.length; i++) {
    const { data, error } = await supabase
      .from('set_meal_recipes')
      .select('recipes ( id, title, img_url )')
      .eq('set_meal_id', setMealList[i].id);

    if (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch set meals.');
    }

    if (data && data?.length > 0) {
      setMealList[i].recipes = data;
    }
  }

  if (data && data?.length > 0) {
    const convertedData = data.map((row: SetMealRow) => ({
      id: row.id,
      title: row.title,
      userId: row.user_id,
      recipes: row.recipes?.map((r) => r.recipes),
    }));
    return convertedData;
  }

  return [];
}

export async function createSetMealRecipes(
  formData: SetMealForm,
  setMealId: number,
) {
  const userId = await getUserId();

  for (let i = 0; i < formData.recipeList.length; i++) {
    const { error } = await supabase.from('set_meal_recipes').insert({
      user_id: userId,
      set_meal_id: setMealId,
      recipe_id: formData.recipeList[i].id,
    });

    if (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to create set meal.');
    }
  }
}

export async function createSetMeal(formData: SetMealForm) {
  const userId = await getUserId();

  let setMealId = 0;

  const { data, error } = await supabase
    .from('set_meals')
    .insert({
      user_id: userId,
      title: formData.title,
    })
    .select();

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create set meal.');
  }

  if (data && data.length > 0) {
    setMealId = data[0].id;
  }

  await createSetMealRecipes(formData, setMealId);

  revalidatePath('/dashboard/set-meal');
  redirect('/dashboard/set-meal');
}

export async function fetchSetMealInfo(setMealId: string) {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from('set_meals')
    .select()
    .eq('id', setMealId)
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch set meal.');
  }

  if (data && data?.length > 0) {
    const convertedData = data.map((row: SetMealInfoRow) => ({
      id: row.id,
      title: row.title,
      userId: row.user_id,
    }));

    return convertedData[0];
  }

  return {
    id: null,
    title: '',
    userId: null,
  };
}

export async function fetchRecipeList(setMealId: string) {
  const { data, error } = await supabase
    .from('set_meal_recipes')
    .select('recipes ( id, title, img_url, user_id, memo )')
    .eq('set_meal_id', setMealId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipes.');
  }

  if (data && data?.length > 0) {
    const convertedData = data.map((row: RecipeListRow) => {
      const recipes = row.recipes;

      if (Array.isArray(recipes)) {
        return {
          id: recipes[0].id,
          imgUrl: recipes[0].img_url,
          title: recipes[0].title,
          memo: recipes[0].memo,
          userId: recipes[0].user_id,
        };
      } else {
        return {
          id: recipes.id,
          imgUrl: recipes.img_url,
          title: recipes.title,
          memo: recipes.memo,
          userId: recipes.user_id,
        };
      }
    });
    return convertedData;
  }

  return [];
}

export async function updateSetMealInfo(
  formData: SetMealForm,
  setMealId: number,
) {
  const userId = await getUserId();

  const { error } = await supabase
    .from('set_meals')
    .update({
      title: formData.title,
    })
    .eq('id', setMealId)
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update set meal.');
  }
}

export async function deleteSetMealRecipes(setMealId: number) {
  const { error } = await supabase
    .from('set_meal_recipes')
    .delete()
    .eq('set_meal_id', setMealId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete set meal recipes.');
  }
}

export async function editSetMeal(formData: SetMealForm, setMealId: number) {
  await updateSetMealInfo(formData, setMealId);
  await deleteSetMealRecipes(setMealId);
  await createSetMealRecipes(formData, setMealId);

  revalidatePath(`/dashboard/set-meal/${setMealId}`);
  redirect(`/dashboard/set-meal/${setMealId}`);
}

export async function deleteSetMeal(setMealId: number) {
  const userId = await getUserId();

  const { error } = await supabase
    .from('set_meals')
    .delete()
    .eq('id', setMealId)
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete set meal.');
  }

  revalidatePath(`/dashboard/set-meal`);
  redirect(`/dashboard/set-meal`);
}
