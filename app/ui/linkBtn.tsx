import Link from 'next/link';

export default function LinkBtn(props: {
  children: React.ReactNode;
  link: string;
  design: string;
}) {
  return (
    <Link
      href={props.link}
      className={`text-center px-6 py-2 rounded-2xl font-bold active:translate-y-1 ${props.design}`}
    >
      {props.children}
    </Link>
  );
}
