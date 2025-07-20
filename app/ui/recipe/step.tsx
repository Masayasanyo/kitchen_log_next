import { Recipe } from '@/app/lib/definitions';

export default async function Page({ recipeData }: { recipeData: Recipe }) {
  return (
    <div className="bg-[#ffffff] rounded-2xl px-6 py-4">
      <h3 className="font-medium text-xl mb-4">手順</h3>
      <div className="flex flex-col gap-2">
        {recipeData.steps?.map((step, index) => (
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
