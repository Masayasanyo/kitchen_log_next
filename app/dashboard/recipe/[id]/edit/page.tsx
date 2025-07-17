import {
  fetchRecipeInfo,
  fetchRecipeTag,
  fetchRecipeIng,
  fetchRecipeStep,
} from '@/app/lib/actions/recipe-actions';
import RecipeEditForm from '@/app/ui/recipe/form/recipe-edit-form';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const recipeInfo = await fetchRecipeInfo(id);
  const tagList = await fetchRecipeTag(id);
  const ingList = await fetchRecipeIng(id);
  const stepList = await fetchRecipeStep(id);

  return (
    <main className="w-full py-5 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">レシピを編集</h1>
      <RecipeEditForm
        recipeId={id}
        recipeInfo={recipeInfo}
        tagList={tagList}
        ingList={ingList}
        stepList={stepList}
      />
    </main>
  );
}
