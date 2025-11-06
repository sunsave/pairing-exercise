import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8 space-y-4">
      <p>Welcome to the Sunsave pairing exercise</p>
      <Link className="underline text-blue-600" href='/battery'>
        Batteries
      </Link>
    </main>
  );
}
