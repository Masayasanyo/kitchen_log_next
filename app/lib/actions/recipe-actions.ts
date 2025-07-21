'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  RecipeRow,
  TagRow,
  IngRow,
  StepRow,
  Ingredient,
  Step,
  RecipeForm,
  Tag,
} from '@/app/lib/definitions';
import { auth } from '@/auth';
import { supabase } from '@/app/lib/supabase';
import { ZenkakuToHankaku } from '../zenkaku-hankaku';

async function getUserId() {
  const session = await auth();
  const userIdString: string = session?.user?.id as string;
  const userId = Number(userIdString);

  return userId;
}

export async function createRecipe(formData: RecipeForm) {
  const userId = await getUserId();
  if (formData.imgFile) {
    formData.imgUrl = await uploadRecipeImg(formData.imgFile);
  }
  const recipeId = await createRecipeInfo(
    userId,
    formData.imgUrl,
    formData.title,
    formData.memo,
  );
  await createRecipeTag(formData.tagList, recipeId);
  await createRecipeIng(formData.ingList, recipeId);
  await createRecipeStep(formData.stepList, recipeId);
  revalidatePath('/dashboard/recipe');
  redirect('/dashboard/recipe');
}

export async function updateRecipeInfo(
  id: number,
  userId: number,
  imgUrl: string,
  title: string,
  memo: string,
) {
  const { error } = await supabase
    .from('recipes')
    .update({
      img_url: imgUrl,
      title: title,
      memo: memo,
    })
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update recipe.');
  }
}

export async function deleteRecipeTag(id: number) {
  const { error } = await supabase.from('tags').delete().eq('recipe_id', id);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete tag.');
  }
}

export async function deleteRecipeIng(id: number) {
  const { error } = await supabase
    .from('ingredients')
    .delete()
    .eq('recipe_id', id);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete ingredients.');
  }
}

export async function deleteRecipeStep(id: number) {
  const { error } = await supabase.from('steps').delete().eq('recipe_id', id);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete steps.');
  }
}

export async function createRecipeInfo(
  userId: number,
  imgUrl: string,
  title: string,
  memo: string,
) {
  const { data, error } = await supabase
    .from('recipes')
    .insert({
      user_id: userId,
      img_url: imgUrl,
      title: title,
      memo: memo,
    })
    .select();

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create recipe.');
  }

  return data[0].id;
}

export async function createRecipeTag(tagList: Tag[], id: number) {
  for (const tag of tagList) {
    const { error } = await supabase.from('tags').insert({
      recipe_id: id,
      name: tag.name,
    });

    if (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to create tag.');
    }
  }
}

export async function createRecipeIng(ingList: Ingredient[], id: number) {
  ingList = ingList.map((ing) => ({
    ...ing,
    name: ZenkakuToHankaku(ing.name),
    amount: ZenkakuToHankaku(ing.amount),
  }));

  for (const ing of ingList) {
    const { error } = await supabase.from('ingredients').insert({
      recipe_id: id,
      name: ing.name,
      amount: ing.amount,
      unit: ing.unit,
    });

    if (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to create ingredients.');
    }
  }
}

export async function createRecipeStep(stepList: Step[], id: number) {
  for (const step of stepList) {
    const { error } = await supabase.from('steps').insert({
      recipe_id: id,
      name: step.name,
    });

    if (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to create steps.');
    }
  }
}

export async function deleteRecipeImg(imgUrl: string) {
  const splittedUrl = imgUrl.split('/');
  const fileName = splittedUrl[splittedUrl.length - 1];
  await supabase.storage.from('img-url').remove([fileName]);
}

export async function uploadRecipeImg(imgFile: File) {
  const uniqueSuffix = Math.random().toString(26).substring(4, 10);
  const fileName = `${Date.now()}-${uniqueSuffix}-${imgFile.name}`;
  let imgUrl = '';

  const { data, error } = await supabase.storage
    .from('img-url')
    .upload(fileName, imgFile);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to upload image.');
  }

  const { data: image } = supabase.storage
    .from('img-url')
    .getPublicUrl(data.path);

  imgUrl = image.publicUrl;

  return imgUrl;
}

export async function deleteRecipe(prevImgUrl: string, recipeId: number) {
  const userId = await getUserId();

  if (prevImgUrl) {
    await deleteRecipeImg(prevImgUrl);
  }

  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', recipeId)
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete recipe.');
  }

  revalidatePath(`/dashboard/recipe`);
  redirect(`/dashboard/recipe`);
}

export async function editRecipe(formData: RecipeForm, recipeId: number) {
  const userId = await getUserId();

  if (formData.imgFile) {
    if (formData.prevImgUrl) {
      await deleteRecipeImg(formData.prevImgUrl);
    }
    formData.imgUrl = await uploadRecipeImg(formData.imgFile);
  }

  await updateRecipeInfo(
    recipeId,
    userId,
    formData.imgUrl,
    formData.title,
    formData.memo,
  );
  await deleteRecipeTag(recipeId);
  await createRecipeTag(formData.tagList, recipeId);

  await deleteRecipeIng(recipeId);
  await createRecipeIng(formData.ingList, recipeId);

  await deleteRecipeStep(recipeId);
  await createRecipeStep(formData.stepList, recipeId);

  revalidatePath(`/dashboard/recipe/${recipeId}`);
  redirect(`/dashboard/recipe/${recipeId}`);
}

export async function fetchRecipes() {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from('recipes')
    .select(
      `
      id, 
      title, 
      img_url, 
      user_id, 
      memo, 
      created_at, 
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
    `,
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipes.');
  }

  if (data && data?.length > 0) {
    const convertedData = data.map((row: RecipeRow) => ({
      id: row.id,
      imgUrl: row.img_url,
      title: row.title,
      memo: row.memo,
      userId: row.user_id,
      tags: row.tags.map((tag: TagRow) => ({
        id: tag.id,
        name: tag.name,
        recipeId: tag.recipe_id,
      })),
      ingredients: row.ingredients.map((ing: IngRow) => ({
        id: ing.id,
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        recipeId: ing.recipe_id,
      })),
      steps: row.steps.map((step: StepRow) => ({
        id: step.id,
        name: step.name,
        recipeId: step.recipe_id,
      })),
    }));

    return convertedData;
  }

  return [];
}

export async function fetchRecipe(recipeId: string) {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from('recipes')
    .select(
      `
      id, 
      title, 
      img_url, 
      user_id, 
      memo, 
      created_at, 
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
    `,
    )
    .eq('user_id', userId)
    .eq('id', recipeId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipes.');
  }

  if (data && data?.length > 0) {
    const convertedData = data.map((row: RecipeRow) => ({
      id: row.id,
      imgUrl: row.img_url,
      title: row.title,
      memo: row.memo,
      userId: row.user_id,
      tags: row.tags.map((tag: TagRow) => ({
        id: tag.id,
        name: tag.name,
        recipeId: tag.recipe_id,
      })),
      ingredients: row.ingredients.map((ing: IngRow) => ({
        id: ing.id,
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        recipeId: ing.recipe_id,
      })),
      steps: row.steps.map((step: StepRow) => ({
        id: step.id,
        name: step.name,
        recipeId: step.recipe_id,
      })),
    }));

    return convertedData[0];
  }

  return;
}

export async function fetchRecipeTag(recipeId: string) {
  const { data, error } = await supabase
    .from('tags')
    .select()
    .eq('recipe_id', recipeId)
    .order('id', { ascending: true });

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tags.');
  }

  if (data && data?.length > 0) {
    const convertedData = data.map((row: TagRow) => ({
      id: row.id,
      recipeId: row.recipe_id,
      name: row.name,
    }));

    return convertedData;
  }

  return [];
}

export async function fetchRecipeIng(recipeId: string) {
  const { data, error } = await supabase
    .from('ingredients')
    .select()
    .eq('recipe_id', recipeId)
    .order('id', { ascending: true });

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ingredients.');
  }

  if (data && data?.length > 0) {
    const convertedData = data.map((row: IngRow) => ({
      id: row.id,
      recipeId: row.recipe_id,
      name: row.name,
      amount: row.amount,
      unit: row.unit,
    }));

    return convertedData;
  }

  return [];
}

export async function fetchRecipeStep(recipeId: string) {
  const { data, error } = await supabase
    .from('steps')
    .select()
    .eq('recipe_id', recipeId)
    .order('id', { ascending: true });

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch steps.');
  }

  if (data && data?.length > 0) {
    const convertedData = data.map((row: StepRow) => ({
      id: row.id,
      recipeId: row.recipe_id,
      name: row.name,
    }));
    return convertedData;
  }

  return [];
}
