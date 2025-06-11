'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { Form } from '@/app/lib/definitions';
import { auth } from '@/auth';
import { createClient } from '@supabase/supabase-js';
import pkg from 'pg';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const sql = postgres(process.env.POSTGRES_URL!);
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function createRecipe(formData: Form) {
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

  try {
    const result = await sql`
      INSERT INTO recipes (user_id, img_url, title, memo)
      VALUES (${userId}, ${imgUrl}, ${formData.title}, ${formData.memo})
      RETURNING id
    `;
    recipeId = result[0].id;
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Create Recipe.',
    };
  }

  for (let i = 0; i < formData.ingList.length; i++) {
    try {
      await sql`
        INSERT INTO ingredients (recipe_id, name, amount)
        VALUES (${recipeId}, ${formData.ingList[i].name}, ${formData.ingList[i].amount})
      `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Recipe.',
      };
    }
  }

  for (let i = 0; i < formData.stepList.length; i++) {
    try {
      await sql`
        INSERT INTO steps (recipe_id, name)
        VALUES (${recipeId}, ${formData.stepList[i]})
      `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Recipe.',
      };
    }
  }

  revalidatePath('/dashboard/recipe');
  redirect('/dashboard/recipe');
}

export async function editRecipe(formData: Form, recipeId: string) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    if (formData.imgFile) {
      if (formData.prevImgUrl) {
        let splittedUrl = formData.prevImgUrl.split('/');
        let previousFileName = splittedUrl[splittedUrl.length - 1];
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
          message: 'Database Error: Failed to Upload Image.',
        };
      }

      const { data: image } = supabase.storage
        .from('img-url')
        .getPublicUrl(data.path);
      formData.imgUrl = image.publicUrl;
    }

    await client.query(
      `UPDATE recipes SET img_url = $1, title = $2, memo = $3 WHERE id = $4`,
      [formData.imgUrl, formData.title, formData.memo, recipeId],
    );

    await client.query(`
      DELETE FROM ingredients 
      WHERE recipe_id = ${recipeId}
    `);
    for (let i = 0; i < formData.ingList.length; i++) {
      await client.query(
        `INSERT INTO ingredients (recipe_id, name, amount) VALUES ($1, $2, $3)`,
        [recipeId, formData.ingList[i].name, formData.ingList[i].amount],
      );
    }

    await client.query(`
      DELETE FROM steps 
      WHERE recipe_id = ${recipeId}
    `);
    for (let i = 0; i < formData.stepList.length; i++) {
      await client.query(
        `INSERT INTO steps (recipe_id, name) VALUES ($1, $2)`,
        [recipeId, formData.stepList[i]],
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return {
      message: 'Database Error: Failed to Update Recipe.',
    };
  } finally {
    client.release();
  }

  revalidatePath(`/dashboard/recipe/${recipeId}`);
  redirect(`/dashboard/recipe/${recipeId}`);
}

export async function deleteRecipe(formData: Form, recipeId: string) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    if (formData.prevImgUrl) {
      let splittedUrl = formData.prevImgUrl.split('/');
      let previousFileName = splittedUrl[splittedUrl.length - 1];
      await supabase.storage.from('img-url').remove([previousFileName]);
    }

    await client.query(`DELETE FROM recipes WHERE id = $1`, [recipeId]);

    await client.query(`DELETE FROM ingredients WHERE recipe_id = $1`, [
      recipeId,
    ]);

    await client.query(`DELETE FROM steps WHERE recipe_id = $1`, [recipeId]);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return {
      message: 'Database Error: Failed to Update Recipe.',
    };
  } finally {
    client.release();
  }

  revalidatePath(`/dashboard/recipe`);
  redirect(`/dashboard/recipe`);
}

export async function fetchRecipes() {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  try {
    const result = await sql`
      SELECT * FROM recipes 
      WHERE user_id = ${userId}
    `;
    return {
      message: 'Recipes retrieved successfully.',
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Fetch Recipe.',
    };
  }
}

export async function fetchRecipeInfo(recipeId: string) {
  try {
    const recipeInfo = await sql`
      SELECT * FROM recipes 
      WHERE id = ${recipeId}
    `;
    return {
      message: 'Recipe retrieved successfully.',
      data: recipeInfo,
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Fetch Recipe.',
    };
  }
}

export async function fetchRecipeIng(recipeId: string) {
  try {
    const ingredients = await sql`
      SELECT * FROM ingredients 
      WHERE recipe_id = ${recipeId}
    `;
    return {
      message: 'Ingredients retrieved successfully.',
      data: ingredients,
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Fetch Ingredients.',
    };
  }
}

export async function fetchRecipeStep(recipeId: string) {
  try {
    const step = await sql`
      SELECT * FROM steps 
      WHERE recipe_id = ${recipeId}
    `;
    return {
      message: 'Steps retrieved successfully.',
      data: step,
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Fetch Steps.',
    };
  }
}
