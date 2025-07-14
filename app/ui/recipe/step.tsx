import { fetchRecipeStep } from '@/app/lib/actions/recipe-actions';

export default async function Page(props: { recipeId: string }) {
  const stepList = await fetchRecipeStep(props.recipeId);

  return (
    <div className="bg-[#ffffff] rounded-2xl px-6 py-4">
      <h3 className="font-medium text-xl mb-4">手順</h3>
      <div className="flex flex-col gap-2">
        {stepList?.map((step, index) => (
          <div key={index}>
            <div className="font-semibold">{index + 1}</div>
            <div>{step.name}</div>
            <hr className="my-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
