"use client"

import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from '@/components/ui/select';
import { Mode } from '@/types/interface';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export interface ModeSelectProps {
  modes: Mode[];
}

export const ModeSelect = ({ modes }: ModeSelectProps) => {
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null)
  const router = useRouter();

  const handleModeSelect = (modeId: string) => {
    const mode = modes.find(mode => mode.id.toString() === modeId);
    setSelectedMode(mode || null);
  };

  const handleStartClick = () => {
    if (selectedMode) {
      let path = '';
      switch (selectedMode.id) {
        case 1:
          path = '/default';
          break;
        case 2:
          path = '/harmony';
          break;
        case 3:
          path = '/practice';
          break;
        default:
          alert('無効なモードです');
          return;
      }
      router.push(`${path}?modeId=${selectedMode.id}`);
    } else {
      alert('モードを選択してください');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <Select onValueChange={handleModeSelect}>
        <SelectTrigger className="w-80 h-12 text-lg">
          <SelectValue placeholder="モードを選択してください" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {modes.map((mode) => (
              <SelectItem key={mode.id} value={mode.id.toString()}>
                {mode.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="mt-16 mx-auto font-palettemosaic mb-24">
        <Button
          variant="outline"
          className="w-32 h-12 text-lg"
          onClick={handleStartClick}
        >
          START
        </Button>
      </div>
    </div>
  )
}

export default ModeSelect