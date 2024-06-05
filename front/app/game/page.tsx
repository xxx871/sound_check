// front/app/game/page.tsx
"use client"

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import EasyGameComponent from './EasyGameComponent';
import NormalGameComponent from './NormalGameComponent';
import HardGameComponent from './HardGameComponent';
import VoiceAnalysisComponent from './VoiceAnalysisComponent';

const Game = () => {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficulty');
  const [targetNote, setTargetNote] = useState<string | null>(null);
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [detectedPitches, setDetectedPitches] = useState<number[]>([]);

  const handlePlayNote = (note: string) => {
    setTargetNote(note);
  };

  const handleAnalysisResult = (result: boolean) => {
    setIsMatch(result);
  };

  const handlePitchDetected = (pitch: number) => {
    setDetectedPitches(prevPitches => [...prevPitches, pitch]);
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
            {isMatch ? 'Matched!' : 'Not Matched!'}
          </div>
        )}
        {detectedPitches.length > 0 && (
          <div>
            <h2>Detected Pitches:</h2>
            {/* {detectedPitches.map((pitch, index) => (
              <p key={index}>Pitch: {pitch.toFixed(2)} Hz</p>
            ))} */}
          </div>
        )}
      </div>
    </main>
  );
};

export default Game;