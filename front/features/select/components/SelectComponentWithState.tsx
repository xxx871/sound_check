"use client"

import { Button } from '@/app/components/elements/Button/Button';
import { SelectComponent } from '@/app/components/elements/Select/SelectComponent';
import { Mode, SelectComponentWithStateProps } from '@/types/interface';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export function SelectComponentWithState({ modes }: SelectComponentWithStateProps) {
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const router = useRouter();

  const translateMode = (mode: string) => {
    switch(mode) {
      case '通常': return 'normal';
      case '練習': return 'practice';
      case 'ハーモニー': return 'harmony';
      default: return mode;
    }
  };

  const handleModeSelect = (modeId: string) => {
    const mode = modes.find(mode => mode.id.toString() === modeId);
    setSelectedMode(mode || null);
  };

  const handleStartClick = () => {
    if (selectedMode) {
      const translatedMode = translateMode(selectedMode.name);
      router.push(`/default?mode=${translatedMode}`);
    } else {
      alert('モードを選択してください');
    }
  };

  return (
    <>
      <SelectComponent modes={modes} onSelect={handleModeSelect} />
      <div className="mt-16 w-16 mx-auto font-palettemosaic mb-24">
        <Button variant="outline" onClick={handleStartClick}>START</Button>
      </div>
    </>
  )
}

export default SelectComponentWithState
