import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <Link href={'/dashboard'}>
        <h1>Go to dashboard</h1>
      </Link>
    </main>
  );
}
