import { Button } from "./components/elements/Button/Button";
import axios from 'axios';
import { SelectComponent } from "./components/elements/Select/Select";

const axiosInstance = axios.create({
  baseURL: `http://host.docker.internal:3000/api/v1/`,
});

export default async function Home() {
  const res = await axiosInstance.get("modes");
  const modes = res.data;
  console.log("modes", modes);

  return (
    <main className="text-white">
      <div>
        <h1 className="text-9xl mt-16 text-center font-palettemosaic font-bold">
          おんぴしゃ
        </h1>
      </div>
      <div className="mt-16 w-72 mx-auto text-2xl font-palettemosaic text-slate-300">
        <SelectComponent modes={modes} />
      </div>
      <div className="mt-16 w-16 mx-auto font-palettemosaic mb-24">
        <Button variant="outline">START</Button>
      </div>
    </main>
  );
}