export default function Cancel(props: { openNav?: () => void }) {
  return (
    <button className="block w-8 ml-auto py-3" onClick={props.openNav}>
      <svg
        className="block w-8 ml-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
      </svg>
    </button>
  );
}
