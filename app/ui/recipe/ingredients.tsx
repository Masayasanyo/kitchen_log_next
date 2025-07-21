import { Recipe } from '@/app/lib/definitions';

export default async function Ingredients({ recipe }: { recipe: Recipe }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#ffffff] rounded-2xl px-6 py-4">
        <h3 className="font-medium text-xl mb-4">材料</h3>
        <div className="flex flex-col gap-2">
          {recipe.ingredients?.map((ing, index) => (
            <div key={index}>
              <div className="flex gap-2">
                <p className="">{ing.name}</p>
                <p className="">...</p>
                <div className="flex gap-1">
                  <p className="">{ing.amount}</p>
                  {ing.unit !== 'その他' && <p className="">{ing.unit}</p>}
                </div>
              </div>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
