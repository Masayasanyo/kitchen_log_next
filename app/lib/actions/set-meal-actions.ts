'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  SetMealForm,
  SetMealRow,
  TagRow,
  IngRow,
  StepRow,
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

  const { data, error } = await supabase
    .from('set_meals')
    .select(
      `
        id, 
        title, 
        user_id, 
        set_meal_recipes (
          id, 
          recipe_id, 
          set_meal_id, 
          recipes ( 
            id,
            title,
            img_url,
            memo, 
            user_id, 
            tags (
              id,
              name,
              recipe_id
            ),
            ingredients (
              id,
              name,
              amount,
              unit,
              recipe_id
            ),
            steps (
              id,
              name,
              recipe_id
            )
          )
        )
      `,
    )
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch set meals.');
  }

  if (data && data?.length > 0) {
    const convertedData = data.map((row: SetMealRow) => ({
      id: row.id,
      title: row.title,
      userId: row.user_id,
      recipes: row.set_meal_recipes?.map((sr) => {
        const recipe = Array.isArray(sr.recipes) ? sr.recipes[0] : sr.recipes;

        return {
          id: recipe.id,
          title: recipe.title,
          imgUrl: recipe.img_url,
          memo: recipe.memo,
          userId: recipe.user_id,
          tags: recipe.tags.map((tag: TagRow) => ({
            id: tag.id,
            name: tag.name,
            recipeId: tag.recipe_id,
          })),
          ingredients: recipe.ingredients.map((ing: IngRow) => ({
            id: ing.id,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            recipeId: ing.recipe_id,
          })),
          steps: recipe.steps.map((step: StepRow) => ({
            id: step.id,
            name: step.name,
            recipeId: step.recipe_id,
          })),
        };
      }),
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

  for (let i = 0; i < formData.recipes.length; i++) {
    const { error } = await supabase.from('set_meal_recipes').insert({
      user_id: userId,
      set_meal_id: setMealId,
      recipe_id: formData.recipes[i].id,
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

export async function fetchSetMeal(setMealId: string) {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from('set_meals')
    .select(
      `
        id, 
        title, 
        user_id, 
        set_meal_recipes (
          id, 
          recipe_id, 
          set_meal_id, 
          recipes (
            id,
            title,
            img_url,
            memo, 
            user_id, 
            tags (
              id,
              name,
              recipe_id
            ),
            ingredients (
              id,
              name,
              amount,
              unit,
              recipe_id
            ),
            steps (
              id,
              name,
              recipe_id
            )
          )
        )
      `,
    )
    .eq('id', setMealId)
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch set meal.');
  }

  if (data && data?.length > 0) {
    const convertedData = data.map((row: SetMealRow) => ({
      id: row.id,
      title: row.title,
      userId: row.user_id,
      recipes: row.set_meal_recipes?.map((sr) => {
        const recipe = Array.isArray(sr.recipes) ? sr.recipes[0] : sr.recipes;

        return {
          id: recipe.id,
          title: recipe.title,
          imgUrl: recipe.img_url,
          memo: recipe.memo,
          userId: recipe.user_id,
          tags: recipe.tags.map((tag: TagRow) => ({
            id: tag.id,
            name: tag.name,
            recipeId: tag.recipe_id,
          })),
          ingredients: recipe.ingredients.map((ing: IngRow) => ({
            id: ing.id,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            recipeId: ing.recipe_id,
          })),
          steps: recipe.steps.map((step: StepRow) => ({
            id: step.id,
            name: step.name,
            recipeId: step.recipe_id,
          })),
        };
      }),
    }));
    return convertedData[0];
  }

  return;
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
