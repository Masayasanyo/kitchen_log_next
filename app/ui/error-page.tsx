export default function ErrorPage({
  setError,
}: {
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div
        className={`fixed w-full h-full bg-[rgba(0,0,0,.5)] 
              top-0 left-0 z-1000`}
      ></div>

      <div
        className={`fixed inset-0 m-auto z-1100 px-4 py-4 bg-[#e8ecd7] 
              rounded-2xl shadow-md size-56 flex flex-col gap-4 items-center justify-center`}
      >
        <div className="flex flex-col gap-4 items-center mx-auto">
          <p className="text-sm text-red-600 font-semibold">
            処理に失敗しました。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setError(false)}
          className={`px-6 py-2 rounded-2xl font-bold active:translate-y-1 
            mt-4 bg-[#1F4529] text-[#E8ECD7] 
            shadow-[0_4px_0_#32633f] hover:bg-[#32633f] active:bg-[#32633f] 
            active:shadow-[0_3px_0_#32633f]`}
        >
          OK
        </button>
      </div>
    </>
  );
}
