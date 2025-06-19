import { Metadata } from 'next';
import Done from '@/app/ui/dashboard/shopping-list/done';

export const metadata: Metadata = {
  title: '購入済み',
};

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="font-bold text-2xl">購入済み</h1>
      <Done />
    </div>
  );
}
