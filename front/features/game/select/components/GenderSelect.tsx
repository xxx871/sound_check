import { Gender } from '@/types/interface'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface GenderSelectProps {
  genders: Gender[];
  onSelect: (selectedGender: string) => void;
}

const GenderSelect = ({ genders, onSelect }: GenderSelectProps) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-80 h-12 text-lg">
        <SelectValue placeholder="難易度を選択してください" />
      </SelectTrigger>
      <SelectContent>
        {genders.map((gender) => (
          <SelectItem key={gender.id} value={gender.id.toString()}>
            {gender.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default GenderSelect