import { Difficult } from "@/types/interface";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface DifficultSelectProps {
  difficulties: Difficult[];
  onSelect: (selectedDifficult: string) => void;
}

const DifficultySelect = ({ difficulties, onSelect }: DifficultSelectProps) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-80 h-12 text-lg">
        <SelectValue placeholder="難易度を選択してください" />
      </SelectTrigger>
      <SelectContent>
        {difficulties.map((difficulty) => (
          <SelectItem key={difficulty.id} value={difficulty.id.toString()}>
            {difficulty.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DifficultySelect