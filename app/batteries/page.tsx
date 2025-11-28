import Link from "next/link";
import { getAll } from "@/app/actions";

export default async function BatteriesPage() {
  const batteries = await getAll();
  return (
    <main className="min-h-screen p-8 space-y-4">
      <ul>
        {batteries.map((id) => (
          <li key={id}>
            <Link className="underline text-blue-600" href={`/batteries/${id}`}>
              {id}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
