"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import EasyGame from './EasyGame';
import MediumGame from './MediumGame';
import HardGame from './HardGame';
import { GameUser, Note } from '@/types/interface';
import VoiceAnalysis from '../../components/VoiceAnalysis';
import { Button } from '@/components/ui/button';
import useMatchCount from '../../hooks/useMatchCount';

interface GameContainerProps {
  userInfo: GameUser;
  notes: Note[];
}

const GameContainer: React.FC<GameContainerProps> = ({ userInfo, notes }) => {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficultyId');
  const mode = searchParams.get('modeId');
  const genderId = searchParams.get('genderId');
  const router = useRouter();
  const [targetNote, setTargetNote] = useState<string | null>(null);
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [detectedPitches, setDetectedPitches] = useState<number[]>([]);
  const { matchCount, incrementMatchCount, resetMatchCount } = useMatchCount();

  const handlePlayNote = (note: string) => {
    setTargetNote(note);
  };

  const handleAnalysisResult = (result: boolean) => {
    setIsMatch(result);
    if (result) {
      incrementMatchCount();
    } else {
      resetMatchCount();
    }
  };

  const handlePitchDetected = (pitch: number) => {
    setDetectedPitches(prevPitches => [...prevPitches, pitch]);
  };

  const handleResultClick = () => {
    const queryParams = new URLSearchParams({
      difficultyId: difficulty || '',
      modeId: mode || '',
      genderId: genderId || '',
    }).toString();
    router.push(`/result?${queryParams}`);
  };

  const renderGameComponent = () => {
    const difficultyNumber = difficulty ? parseInt(difficulty, 10) : 0;
    switch (difficultyNumber) {
      case 1:
        return <EasyGame userInfo={userInfo} onPlayNote={handlePlayNote}/>
      case 2:
        return <MediumGame />
      case 3:
        return <HardGame />
      default:
        return <p>Invalid difficulty level</p>
    }
  };

  return (
    <div className="text-white">
      <div>
        {renderGameComponent()}
        <h2 className="text-white text-center mt-10">音が流れた後、ボタンを押して音声を入力</h2>
        {targetNote && (
          <VoiceAnalysis
            targetNote={targetNote}
            notes={notes}
            onResult={handleAnalysisResult}
            onPitchDetected={handlePitchDetected}
          />
        )}
        {isMatch !== null && (
          <div className="w-72 mx-auto text-2xl text-slate-300 text-center">
            <div>{isMatch ? '一致' : '不一致'}</div>
            <Button onClick={handleResultClick} className="w-72 text-2xl text-center">
              結果へ進む
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameContainer