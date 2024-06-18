"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DifficultySelect from './DifficultySelect';
import GenderSelect from './GenderSelect';
import { Button } from '@/components/ui/button';

interface DifficultGenderSelectProps {
  genders: { id: number; name: string }[];
  difficulties: { id: number; name: string }[];
  userInfo: any;
  modes: { id: number; name: string }[];
}

export const DifficultGenderSelect: React.FC<DifficultGenderSelectProps> = ({
  genders,
  difficulties,
  userInfo,
  modes,
}) => {
  const [selectedDifficult, setSelectedDifficult] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [showGenderSelect, setShowGenderSelect] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeId = searchParams.get('modeId');

  useEffect(() => {
    setShowGenderSelect(!userInfo || !userInfo.gender);
  }, [userInfo]);

  const handleStartClick = () => {
    if (!selectedDifficult) {
      alert('難易度を選択してください');
      return;
    }
    if (showGenderSelect && !selectedGender) {
      alert('性別を選択してください');
      return;
    }
    const path = `/normal?modeId=${modeId}&difficultyId=${selectedDifficult}&genderId=${selectedGender}`;
    router.push(path);
  };

  const selectedMode = modes.find(mode => mode.id.toString() === modeId);

  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      <h1 className="text-center mb-5 mt-16 text-3xl font-medium">
        {selectedMode ? `${selectedMode.name}モード` : 'モードが見つかりません'}
      </h1>
      <div className="text-2xl mt-16 w-72 mx-auto">
        <div>
          <label>難易度</label>
        </div>
        <DifficultySelect difficulties={difficulties} onSelect={setSelectedDifficult} />
      </div>
      {showGenderSelect && (
        <div className="text-2xl mt-4 w-72 mx-auto">
          <label>性別</label>
          <GenderSelect genders={genders} onSelect={setSelectedGender} />
        </div>
      )}
      <Button
        variant="outline"
        onClick={handleStartClick}
        className="w-32 h-12 text-lg mt-16"
      >
        START
      </Button>
    </div>
  )
}

export default DifficultGenderSelect