"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import EasyGameComponent from './EasyGameComponent';
import NormalGameComponent from './NormalGameComponent';
import HardGameComponent from './HardGameComponent';
import VoiceAnalysisComponent from './VoiceAnalysisComponent';

const Game = () => {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficulty');
  const mode = searchParams.get('mode');
  const genderId = searchParams.get('genderId');
  const router = useRouter();
  const [targetNote, setTargetNote] = useState<string | null>(null);
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [detectedPitches, setDetectedPitches] = useState<number[]>([]);
  const [matchCount, setMatchCount] = useState<number>(0);

  useEffect(() => {
    // セッションストレージから一致回数を取得
    const storedMatchCount = sessionStorage.getItem('matchCount');
    if (storedMatchCount) {
      setMatchCount(parseInt(storedMatchCount, 10));
    }
  }, []);

  const handlePlayNote = (note: string) => {
    setTargetNote(note);
  };

  const handleAnalysisResult = (result: boolean) => {
    setIsMatch(result);
    if (result) {
      setMatchCount(prevCount => {
        const newCount = prevCount + 1;
        sessionStorage.setItem('matchCount', newCount.toString()); // 一致回数をセッションストレージに保存
        return newCount;
      });
    } else {
      setMatchCount(0);
      sessionStorage.setItem('matchCount', '0'); // 不一致の場合、一致回数をリセット
    }
  };

  const handlePitchDetected = (pitch: number) => {
    setDetectedPitches(prevPitches => [...prevPitches, pitch]);
  };

  const handleResultClick = () => {
    const queryParams = new URLSearchParams({
      difficulty: difficulty || '',
      mode: mode || '',
      genderId: genderId || ''
    }).toString();
    router.push(`/result?${queryParams}`);
  };

  const renderGameComponent = () => {
    switch (difficulty) {
      case 'easy':
        return <EasyGameComponent onPlayNote={handlePlayNote} />;
      case 'normal':
        return <NormalGameComponent />;
      case 'hard':
        return <HardGameComponent />;
      default:
        return <p>Invalid difficulty level</p>;
    }
  };

  return (
    <main className="text-white">
      <h1 className="text-4xl text-center mt-16">ゲーム画面</h1>
      <div className="mt-16 w-72 mx-auto text-2xl text-slate-300">
        {renderGameComponent()}
        {targetNote && (
          <VoiceAnalysisComponent
            targetNote={targetNote}
            onResult={handleAnalysisResult}
            onPitchDetected={handlePitchDetected}
          />
        )}
        {isMatch !== null && (
          <div>
            {isMatch ? '一致' : '不一致'}
            <button onClick={handleResultClick} className="mt-4 p-2 bg-blue-500 text-white">
              結果へ進む
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Game;
