import RecipeInfo from '@/app/ui/recipe/recipe-info';
import Tag from '@/app/ui/recipe/tag';
import Ingredients from '@/app/ui/recipe/ingredients';
import Step from '@/app/ui/recipe/step';
import Link from 'next/link';
import EditBtn from '@/app/ui/recipe/edit-btn';
import { fetchRecipe } from '@/app/lib/actions/recipe-actions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const recipeData = await fetchRecipe(id);

  return (
    <main className="w-full flex flex-col gap-8">
      {/* <Link href={`${id}/edit`} className="flex justify-end">
        <EditBtn
          color="bg-[#1F4529] text-[#E8ECD7] shadow-[0_3px_0_#32633f] hover:bg-[#32633f] 
            active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
          size="w-4 h-4"
        />
      </Link> */}
      <EditBtn recipeData={recipeData} />
      <RecipeInfo recipeData={recipeData} />
      <Tag recipeData={recipeData} />
      <Ingredients recipeData={recipeData} />
      <Step recipeData={recipeData} />
    </main>
  );
}
