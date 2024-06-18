import ModeSelect from "@/features/game/select/components/ModeSelect";
import { getModes } from "@/lib/api/getModes";
import { Mode } from "@/types/interface";

export default async function Home() {
  const modes: Mode[] = await getModes();

  return (
    <main className="text-white">
      <div>
      <h1 className="text-9xl mt-16 text-center font-palettemosaic font-bold">
          おんぴしゃ
        </h1>
      </div>
      <div className="mt-16 flex flex-col items-center justify-center">
      <ModeSelect modes={modes} />
      </div>
    </main>
  )
}