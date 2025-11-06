import { get } from './actions';
import Battery from './battery';

export default async function BatteryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const battery = await get(id);

  return (
    <main className="px-8 min-h-screen">
      <Battery battery={battery} id={id} />
    </main>
  );
}
