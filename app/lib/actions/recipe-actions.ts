'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { RecipeForm } from '@/app/lib/definitions/definitions';
import { auth } from '@/auth';
import { supabase } from '@/app/lib/supabase';
import { ZenkakuToHankaku } from '../zenkaku-hankaku';

export async function createRecipe(formData: RecipeForm) {
  const session = await auth();
  const userId: string = session?.user?.id as string;
  let recipeId = 0;
  let imgUrl = '';

  if (formData.imgFile) {
    try {
      const file = formData.imgFile;
      const uniqueSuffix = Math.random().toString(26).substring(4, 10);
      const fileName = `${Date.now()}-${uniqueSuffix}-${file.name}`;

      const { data, error } = await supabase.storage
        .from('img-url')
        .upload(fileName, file);
      if (error) {
        console.log(error);
        return {
          message: 'Database Error: Failed to Upload Image.',
        };
      }

      const { data: image } = supabase.storage
        .from('img-url')
        .getPublicUrl(data.path);
      imgUrl = image.publicUrl;
    } catch (error) {
      console.log(error);
      return {
        message: 'Database Error: Failed to Upload Image.',
      };
    }
  }

  const { data, error } = await supabase
    .from('recipes')
    .insert({
      user_id: userId,
      img_url: imgUrl,
      title: formData.title,
      memo: formData.memo,
    })
    .select();
  if (data && data.length > 0) {
    recipeId = data[0].id;
  }
  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to create recipe.',
    };
  }

  formData.ingList = formData.ingList.map((ing) => ({
    ...ing,
    name: ZenkakuToHankaku(ing.name),
    amount: ZenkakuToHankaku(ing.amount),
  }));

  for (let i = 0; i < formData.ingList.length; i++) {
    const { error } = await supabase.from('ingredients').insert({
      recipe_id: recipeId,
      name: formData.ingList[i].name,
      amount: formData.ingList[i].amount,
      unit: formData.ingList[i].unit,
    });
    if (error) {
      console.log(error);
      return {
        message: 'Database Error: Failed to create recipe.',
      };
    }
  }

  for (let i = 0; i < formData.stepList.length; i++) {
    const { error } = await supabase.from('steps').insert({
      recipe_id: recipeId,
      name: formData.stepList[i].name,
    });
    if (error) {
      console.log(error);
      return {
        message: 'Database Error: Failed to create recipe.',
      };
    }
  }

  revalidatePath('/dashboard/recipe');
  redirect('/dashboard/recipe');
}

export async function editRecipe(formData: RecipeForm, recipeId: string) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  if (formData.imgFile) {
    if (formData.prevImgUrl) {
      const splittedUrl = formData.prevImgUrl.split('/');
      const previousFileName = splittedUrl[splittedUrl.length - 1];
      await supabase.storage.from('img-url').remove([previousFileName]);
    }

    const file = formData.imgFile;
    const uniqueSuffix = Math.random().toString(26).substring(4, 10);
    const fileName = `${Date.now()}-${uniqueSuffix}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('img-url')
      .upload(fileName, file);
    if (error) {
      console.log(error);
      return {
        message: 'Database Error: Failed to upload image.',
      };
    }

    const { data: image } = supabase.storage
      .from('img-url')
      .getPublicUrl(data.path);
    formData.imgUrl = image.publicUrl;
  }

  const { error: recipesError } = await supabase
    .from('recipes')
    .update({
      img_url: formData.imgUrl,
      title: formData.title,
      memo: formData.memo,
    })
    .eq('id', recipeId)
    .eq('user_id', userId);
  if (recipesError) {
    console.log(recipesError);
    return {
      message: 'Database Error: Failed to edit recipe.',
    };
  }

  const { error: deleteIngError } = await supabase
    .from('ingredients')
    .delete()
    .eq('recipe_id', recipeId)
    .select();
  if (deleteIngError) {
    console.log(deleteIngError);
    return {
      message: 'Database Error: Failed to edit recipe.',
    };
  }

  formData.ingList = formData.ingList.map((ing) => ({
    ...ing,
    name: ZenkakuToHankaku(ing.name),
    amount: ZenkakuToHankaku(ing.amount),
  }));

  for (let i = 0; i < formData.ingList.length; i++) {
    const { error } = await supabase.from('ingredients').insert({
      recipe_id: recipeId,
      name: formData.ingList[i].name,
      amount: formData.ingList[i].amount,
      unit: formData.ingList[i].unit,
    });
    if (error) {
      console.log(error);
      return {
        message: 'Database Error: Failed to edit recipe.',
      };
    }
  }

  const { error: deleteStepError } = await supabase
    .from('steps')
    .delete()
    .eq('recipe_id', recipeId)
    .select();
  if (deleteStepError) {
    console.log(deleteStepError);
    return {
      message: 'Database Error: Failed to edit recipe.',
    };
  }

  for (let i = 0; i < formData.stepList.length; i++) {
    const { error } = await supabase.from('steps').insert({
      recipe_id: recipeId,
      name: formData.stepList[i].name,
    });
    if (error) {
      console.log(error);
      return {
        message: 'Database Error: Failed to edit recipe.',
      };
    }
  }
  revalidatePath(`/dashboard/recipe/${recipeId}`);
  redirect(`/dashboard/recipe/${recipeId}`);
}

export async function deleteRecipe(formData: RecipeForm, recipeId: string) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  if (formData.prevImgUrl) {
    const splittedUrl = formData.prevImgUrl.split('/');
    const previousFileName = splittedUrl[splittedUrl.length - 1];
    await supabase.storage.from('img-url').remove([previousFileName]);
  }

  const { error: deleteRecipeError } = await supabase
    .from('recipes')
    .delete()
    .eq('id', recipeId)
    .eq('user_id', userId)
    .select();
  if (deleteRecipeError) {
    console.log(deleteRecipeError);
    return {
      message: 'Database Error: Failed to delete recipe.',
    };
  }

  const { error: deleteIngError } = await supabase
    .from('ingredients')
    .delete()
    .eq('recipe_id', recipeId)
    .select();
  if (deleteIngError) {
    console.log(deleteIngError);
    return {
      message: 'Database Error: Failed to delete recipe.',
    };
  }

  const { error: deleteStepError } = await supabase
    .from('steps')
    .delete()
    .eq('recipe_id', recipeId)
    .select();
  if (deleteStepError) {
    console.log(deleteStepError);
    return {
      message: 'Database Error: Failed to delete recipe.',
    };
  }
  revalidatePath(`/dashboard/recipe`);
  redirect(`/dashboard/recipe`);
}

export async function fetchRecipes() {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const { data, error } = await supabase
    .from('recipes')
    .select()
    .eq('user_id', userId);
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

export async function fetchRecipeInfo(recipeId: string) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const { data, error } = await supabase
    .from('recipes')
    .select()
    .eq('id', recipeId)
    .eq('user_id', userId);
  if (data && data?.length > 0) {
    return {
      message: 'Recipe retrieved successfully.',
      data: data,
    };
  }
  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to fetch recipe.',
    };
  }
}

export async function fetchRecipeIng(recipeId: string) {
  const { data, error } = await supabase
    .from('ingredients')
    .select()
    .eq('recipe_id', recipeId);
  if (data && data?.length > 0) {
    return {
      message: 'Ingredients retrieved successfully.',
      data: data,
    };
  }
  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to fetch ingredients.',
    };
  }
}

export async function fetchRecipeStep(recipeId: string) {
  const { data, error } = await supabase
    .from('steps')
    .select()
    .eq('recipe_id', recipeId);
  if (data && data?.length > 0) {
    return {
      message: 'Steps retrieved successfully.',
      data: data,
    };
  }
  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to fetch steps.',
    };
  }
}

export async function searchRecipe(query: string) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const { data, error } = await supabase
    .from('recipes')
    .select()
    .ilike('title', `%${query}%`)
    .eq('user_id', userId);
  if (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to fetch recipes.',
    };
  }
  if (data && data?.length > 0) {
    return {
      message: 'Recipes retrieved successfully.',
      data: data,
    };
  } else {
    return {
      message: 'Recipe not found.',
      data: data,
    };
  }
}
