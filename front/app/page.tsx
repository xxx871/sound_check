import SelectComponentWithState from "@/features/select/components/SelectComponentWithState";
import { getPathForMode } from '@/utils/pathUtils';
import { Mode } from "@/types/interface";
import { axiosInstance } from "@/services/user";

export default async function Home() {
  const res = await axiosInstance.get<Mode[]>('modes');
  const modes = res.data.map(mode => ({
    ...mode,
    path: getPathForMode(mode.name),
  }));
  
  return (
    <main className="text-white">
      <div>
        <h1 className="text-9xl mt-16 text-center font-palettemosaic font-bold">
          おんぴしゃ
        </h1>
      </div>
      <div className="mt-16 w-72 mx-auto text-2xl font-palettemosaic text-slate-300">
        <SelectComponentWithState modes={modes} />
      </div>
    </main>
  );
}
