// front/app/components/elements/Select/SelectComponent.tsx
'use client';

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectDifficultProps } from "@/types/interface";
import * as SelectPrimitive from "@radix-ui/react-select"

const Select = SelectPrimitive.Root

export function SelectDifficultComponent({ options, onSelect }: SelectDifficultProps) {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-288px">
        <SelectValue placeholder="モードを選択" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={index} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
