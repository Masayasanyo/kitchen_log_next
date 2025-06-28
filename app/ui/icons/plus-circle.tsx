export default function PlusBtn(props: { design: string }) {
  return (
    <div
      className={`p-1 rounded-full flex items-center justify-center active:translate-y-1 
        ${props.design}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={`bi bi-plus w-full h-full`}
        viewBox="0 0 16 16"
      >
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
      </svg>
    </div>
  );
}
