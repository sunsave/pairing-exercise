import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8 space-y-4">
      <p>Welcome to the Sunsave pairing exercise 👋</p>
      <Link className="block underline text-blue-600" href="/batteries">
        Batteries
      </Link>
    </main>
  );
}
