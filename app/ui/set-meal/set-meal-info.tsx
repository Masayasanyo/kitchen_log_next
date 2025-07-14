import { fetchSetMealInfo } from '@/app/lib/actions/set-meal-actions';

export default async function Page(props: { setMealId: string }) {
  const setMealInfo = await fetchSetMealInfo(props.setMealId);

  return <h2 className="text-xl font-semibold">{setMealInfo?.title}</h2>;
}
