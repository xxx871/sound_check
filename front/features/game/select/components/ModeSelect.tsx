"use client"

import { LoadingButton } from '@/app/components/elements/LoadingButton';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from '@/components/ui/select';
import { Mode } from '@/types/interface';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export interface ModeSelectProps {
  modes: Mode[];
}

export const ModeSelect = ({ modes }: ModeSelectProps) => {
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleModeSelect = (modeId: string) => {
    const mode = modes.find(mode => mode.id.toString() === modeId);
    setSelectedMode(mode || null);
  };

  const handleStartClick = async () => {
    if (selectedMode) {
      setIsLoading(true);
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
          setIsLoading(false);
          return;
      }
      await router.push(`${path}?modeId=${selectedMode.id}`);
    } else {
      alert('モードを選択してください');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <Select onValueChange={(value: string) => handleModeSelect(value)}>
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
        <LoadingButton
          variant="outline"
          className="w-32 h-12 text-lg"
          isLoading={isLoading}
          onClick={handleStartClick}
        >
          START
        </LoadingButton>
      </div>
    </div>
  )
}

export default ModeSelect;
