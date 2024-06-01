"use client"

import { Button } from '@/app/components/elements/Button/Button';
import { SelectComponent } from '@/app/components/elements/Select/SelectComponent';
import { Mode, SelectComponentWithStateProps } from '@/types/interface';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export function SelectComponentWithState({ modes }: SelectComponentWithStateProps) {
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const router = useRouter();

  const handleModeSelect = (modeId: string) => {
    const mode = modes.find(mode => mode.id.toString() === modeId);
      setSelectedMode(mode || null);
  };

  const handleStartClick = () => {
    if (selectedMode) {
      router.push(`/default?mode=${selectedMode.name}`);
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