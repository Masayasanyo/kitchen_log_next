import Loader from '@/app/ui/icons/loader';

export default function PendingPage() {
  return (
    <>
      <div
        className={`fixed w-full h-full bg-[rgba(0,0,0,.5)] 
          top-0 left-0 z-1000`}
      ></div>

      <div
        className={`fixed inset-0 m-auto z-1100 px-4 py-4 bg-[#e8ecd7] 
          rounded-2xl shadow-md size-56 flex items-center`}
      >
        <div className="flex flex-col gap-4 items-center mx-auto">
          <h1 className="text-center">処理中です</h1>
          <Loader />
        </div>
      </div>
    </>
  );
}
