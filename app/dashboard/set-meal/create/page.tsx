import CreateForm from '@/app/ui/dashboard/set-meal/create/form';

export default function Page() {
  return (
    <main className="w-full py-5 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">献立を追加</h1>
      <CreateForm />
    </main>
  );
}
