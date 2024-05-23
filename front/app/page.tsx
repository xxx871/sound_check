
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/elements/Select/Select";
import { Button } from "./components/elements/Button/Button";

export default function Home() {
  return (
    <main className="text-white">
      <div>
        <h1 className="text-9xl mt-16 text-center font-palettemosaic font-bold">
          おんぴしゃ
        </h1>
      </div>
      <div className="mt-16 w-72 mx-auto text-2xl font-palettemosaic text-slate-300">
        <Select>
          <SelectTrigger className="w-288px]">
            <SelectValue placeholder="モードせんたく"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">つうじょうモード</SelectItem>
            <SelectItem value="dark">れんしゅうモード</SelectItem>
            <SelectItem value="system">ハモりモード</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-16 w-16 mx-auto font-palettemosaic mb-24">
        <Button variant="outline">START</Button>
      </div>
    </main>
  );
}