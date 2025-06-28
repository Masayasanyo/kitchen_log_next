import RecipeInfo from '@/app/ui/dashboard/recipe/id/recipe-info';
import Ingredients from '@/app/ui/dashboard/recipe/id/ingredients';
import Step from '@/app/ui/dashboard/recipe/id/step';
import EditBtn from '@/app/ui/icons/edit-btn';
import Link from 'next/link';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const recipeId = params.id;

  return (
    <main className="w-full flex flex-col gap-8">
      <Link href={`${recipeId}/edit`} className="flex justify-end">
        <EditBtn
          design="bg-[#1F4529] text-[#E8ECD7] shadow-[0_3px_0_#32633f] hover:bg-[#32633f] 
            active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
          size="w-4 h-4"
        />
      </Link>
      <RecipeInfo recipeId={recipeId} />
      <Ingredients recipeId={recipeId} />
      <Step recipeId={recipeId} />
    </main>
  );
}
