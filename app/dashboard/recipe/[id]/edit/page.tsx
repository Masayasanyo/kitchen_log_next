import { fetchRecipe } from '@/app/lib/actions/recipe-actions';
import RecipeEditForm from '@/app/ui/recipe/form/recipe-edit-form';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const recipeData = await fetchRecipe(id);

  return (
    <main className="w-full py-5 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">レシピを編集</h1>
      <RecipeEditForm recipeData={recipeData} />
    </main>
  );
}
