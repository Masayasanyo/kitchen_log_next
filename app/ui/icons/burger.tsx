export default function Burger(props: { openNav?: () => void }) {
  return (
    <button onClick={props.openNav} className="block p-0">
      <svg
        className="w-8 md:w-12 block overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        // viewBox="0 0 16 16"
        viewBox="2 2 12 12" // ← ここを調整
      >
        <path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
        />
      </svg>
    </button>
  );
}
