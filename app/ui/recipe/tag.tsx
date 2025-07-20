import { Recipe } from '@/app/lib/definitions';

export default async function Page({ recipeData }: { recipeData: Recipe }) {
  return (
    <div className="flex flex-wrap gap-2">
      {recipeData.tags?.map((tag, index) => (
        <div key={index} className="bg-[#ffffff] rounded-2xl px-4 py-2">
          <div>{tag.name}</div>
        </div>
      ))}
    </div>
  );
}
