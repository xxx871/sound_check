'use client';

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mode } from "@/types/mode";
import * as SelectPrimitive from "@radix-ui/react-select"

export interface SelectComponentProps {
  modes: Mode[];
}

const Select = SelectPrimitive.Root

export function SelectComponent({ modes }: SelectComponentProps) {
  return (
    <Select>
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
