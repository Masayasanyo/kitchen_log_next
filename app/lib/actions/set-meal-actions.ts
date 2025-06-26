'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SetMealForm } from '@/app/lib/definitions/definitions';
import { auth } from '@/auth';
import { supabase } from '@/app/lib/supabase';

export async function fetchSetMeals() {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  let setMealList = [];

  const { data, error } = await supabase
    .from('set_meals')
    .select()
    .eq('user_id', userId);
  if (data && data?.length > 0) {
    setMealList = data;
  } else {
    return { message: 'Set meals not found.' };
  }
  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to fetch set meal.',
    };
  }

  for (let i = 0; i < setMealList.length; i++) {
    const { data, error } = await supabase
      .from('set_meal_recipes')
      .select('recipes ( id, title, img_url )')
      .eq('set_meal_id', setMealList[i].id);
    if (data && data?.length > 0) {
      setMealList[i].recipes = data;
    }
    if (error) {
      console.log(error);
      return {
        message: 'Database Error: Failed to fetch set meal.',
      };
    }
  }
  return {
    message: 'Set meals retrieved successfully.',
    data: setMealList,
  };
}

export async function createSetMeal(formData: SetMealForm) {
  const session = await auth();
  const userId: string = session?.user?.id as string;
  let setMealId = 0;

  const { data, error } = await supabase
    .from('set_meals')
    .insert({
      user_id: userId,
      title: formData.title,
    })
    .select();
  if (data && data.length > 0) {
    setMealId = data[0].id;
  }
  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to create set meal.',
    };
  }

  for (let i = 0; i < formData.recipeList.length; i++) {
    const { data, error } = await supabase
      .from('set_meal_recipes')
      .insert({
        user_id: userId,
        set_meal_id: setMealId,
        recipe_id: formData.recipeList[i].id,
      })
      .select();
    if (data && data.length > 0) {
      setMealId = data[0].id;
    }
    if (error) {
      console.log(error);
      return {
        message: 'Database Error: Failed to create set meal.',
      };
    }
  }

  revalidatePath('/dashboard/set-meal');
  redirect('/dashboard/set-meal');
}

export async function fetchRecipeSugList(keyword: string) {
  const { data, error } = await supabase
    .from('recipes')
    .select()
    .ilike('title', `%${keyword}%`);
  if (data && data?.length > 0) {
    return {
      message: 'Recipes retrieved successfully.',
      data: data,
    };
  }
  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to fetch recipes.',
    };
  }
}

export async function fetchSetMealInfo(setMealId: string) {
  const { data, error } = await supabase
    .from('set_meals')
    .select()
    .eq('id', setMealId);
  if (data && data?.length > 0) {
    return {
      message: 'Set meal retrieved successfully.',
      data: data,
    };
  }
  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to fetch set meal.',
    };
  }
}

export async function fetchRecipeList(setMealId: string) {
  const { data, error } = await supabase
    .from('set_meal_recipes')
    .select('recipes ( id, title, img_url, user_id, memo )')
    .eq('set_meal_id', setMealId);
  if (!data || data?.length < 0) {
    return {
      message: 'Recipe not found.',
      data: data,
    };
  }
  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to fetch set meal.',
    };
  }

  return {
    message: 'Recipe retrieved successfully.',
    data: data,
  };
}

export async function editSetMeal(formData: SetMealForm, setMealId: string) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const { error: smError } = await supabase
    .from('set_meals')
    .update({
      title: formData.title,
    })
    .eq('id', setMealId);
  if (smError) {
    console.log(smError);
    return {
      message: 'Database Error: Failed to edit set meal.',
    };
  }

  const { error: deleteSmError } = await supabase
    .from('set_meal_recipes')
    .delete()
    .eq('set_meal_id', setMealId)
    .select();
  if (deleteSmError) {
    console.log(deleteSmError);
    return {
      message: 'Database Error: Failed to edit set meal.',
    };
  }

  for (let i = 0; i < formData.recipeList.length; i++) {
    const { error } = await supabase
      .from('set_meal_recipes')
      .insert({
        user_id: userId,
        set_meal_id: setMealId,
        recipe_id: formData.recipeList[i].id,
      })
      .select();
    if (error) {
      console.log(error);
      return {
        message: 'Database Error: Failed to edit set meal.',
      };
    }
  }

  revalidatePath(`/dashboard/set-meal/${setMealId}`);
  redirect(`/dashboard/set-meal/${setMealId}`);
}

export async function deleteSetMeal(setMealId: string) {
  const { error: deleteSmError } = await supabase
    .from('set_meals')
    .delete()
    .eq('id', setMealId)
    .select();
  if (deleteSmError) {
    console.log(deleteSmError);
    return {
      message: 'Database Error: Failed to delete set meal.',
    };
  }

  revalidatePath(`/dashboard/set-meal`);
  redirect(`/dashboard/set-meal`);
}

export async function searchSetMeal(query: string) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  let setMealList = [];

  const { data, error } = await supabase
    .from('set_meals')
    .select()
    .ilike('title', `%${query}%`)
    .eq('user_id', userId);
  if (data && data?.length > 0) {
    setMealList = data;
  } else {
    return { message: 'Set meals not found.', data: [] };
  }
  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to fetch set meal.',
      data: [],
    };
  }

  for (let i = 0; i < setMealList.length; i++) {
    const { data, error } = await supabase
      .from('set_meal_recipes')
      .select('recipes ( id, title, img_url )')
      .eq('set_meal_id', setMealList[i].id);
    if (data && data?.length > 0) {
      setMealList[i].recipes = data;
    }
    if (error) {
      console.log(error);
      return {
        message: 'Database Error: Failed to fetch set meal.',
        data: [],
      };
    }
  }
  return {
    message: 'Set meals retrieved successfully.',
    data: setMealList,
  };
}
