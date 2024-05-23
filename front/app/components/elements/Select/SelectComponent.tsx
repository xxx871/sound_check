'use client';

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectComponentProps } from "@/types/mode";
import * as SelectPrimitive from "@radix-ui/react-select"

const Select = SelectPrimitive.Root

export function SelectComponent({ modes, onSelect }: SelectComponentProps) {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-288px">
        <SelectValue placeholder="モードせんたく" />
      </SelectTrigger>
      <SelectContent>
        {modes.map((mode) => (
          <SelectItem key={mode.id} value={mode.id.toString()}>
            {mode.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
