import { fetchRecipeTag } from '@/app/lib/actions/recipe-actions';

export default async function Page(props: { recipeId: string }) {
  const tagList = await fetchRecipeTag(props.recipeId);

  return (
    <div className="flex flex-wrap gap-2">
      {tagList?.map((tag, index) => (
        <div key={index} className="bg-[#ffffff] rounded-2xl px-4 py-2">
          <div>{tag.name}</div>
        </div>
      ))}
    </div>
  );
}
