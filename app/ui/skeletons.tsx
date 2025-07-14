// Loading animation
const shimmer = `before:absolute before:inset-0 before:-translate-x-full 
  before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r 
  before:from-transparent before:via-white/60 before:to-transparent`;

export function RecipesSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <RecipeSkeleton />
      <RecipeSkeleton />
      <RecipeSkeleton />
      <RecipeSkeleton />
    </div>
  );
}

export function RecipeSkeleton() {
  return (
    <div className={`${shimmer} rounded-2xl shadow-md bg-gray-100`}>
      <div className="object-cover aspect-video w-full rounded-2xl"></div>
    </div>
  );
}

export function SetMealsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <SetMealSkeleton />
      <SetMealSkeleton />
      <SetMealSkeleton />
      <SetMealSkeleton />
    </div>
  );
}

export function SetMealSkeleton() {
  return (
    <div className={`${shimmer} rounded-md shadow-md bg-gray-100`}>
      <div className="object-cover aspect-video w-full rounded-2xl"></div>
    </div>
  );
}

export function ShoppingListSkeleton() {
  return (
    <div className={`${shimmer} flex flex-col`}>
      <ShoppingListRowSkeleton />
      <ShoppingListRowSkeleton />
      <ShoppingListRowSkeleton />
      <ShoppingListRowSkeleton />
    </div>
  );
}

export function ShoppingListRowSkeleton() {
  return <hr className="my-4" />;
}
