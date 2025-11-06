import Link from 'next/link';
import { batteries } from './batteries';

export default function Home() {
  return (
    <main className="min-h-screen p-8 space-y-4">
      <ul>
        {Object.entries(batteries).map(([id, _battery]) => (
          <li key={id}>
            <Link className="underline text-blue-600" href={`/battery/${id}`}>
              {id}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
