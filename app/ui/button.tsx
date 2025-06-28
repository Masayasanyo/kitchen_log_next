export default function Button(props: {
  title: string;
  action: () => void;
  color: string;
}) {
  return (
    <button
      className={`px-6 py-2 rounded-2xl font-bold active:translate-y-1 ${props.color}`}
      type="button"
      onClick={props.action}
    >
      {props.title}
    </button>
  );
}
