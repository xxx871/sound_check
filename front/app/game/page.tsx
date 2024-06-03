"use client"

import { useSearchParams } from 'next/navigation';
import React from 'react'
import EasyGameComponent from './EasyGameComponent';
import NormalGameComponent from './NormalGameComponent';
import HardGameComponent from './HardGameComponent';

const Game = () => {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficulty');

  const renderGameComponent = () => {
    switch (difficulty) {
      case 'easy':
        return <EasyGameComponent />;
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
      </div>
    </main>
  );
};

export default Game