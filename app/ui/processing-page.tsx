import Loader from '@/app/ui/icons/loader';

export default function ProcessingPage() {
  return (
    <div className="flex flex-col gap-4 items-center mx-auto my-20">
      <h1 className="text-center">処理中です</h1>
      <Loader />
    </div>
  );
}
