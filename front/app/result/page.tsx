"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Result = () => {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficulty');
  const mode = searchParams.get('mode');
  const genderId = searchParams.get('genderId');
  const router = useRouter();

  const handleBackToHome = () => {
    sessionStorage.removeItem('matchCount'); // トップページに戻る際に一致回数を破棄
    router.push('/');
  };

  const handlePlayAgain = () => {
    const queryParams = new URLSearchParams({
      difficulty: difficulty || '',
      mode: mode || '',
      genderId: genderId || ''
    }).toString();
    router.push(`/game?${queryParams}`);
  };

  // セッションストレージから一致回数を取得
  const matchCount = parseInt(sessionStorage.getItem('matchCount') || '0', 10);

  return (
    <main className="text-white">
      <h1 className="text-4xl text-center mt-16">結果画面</h1>
      <div className="mt-16 w-72 mx-auto text-2xl text-slate-300">
        <p>連続で一致した回数: {matchCount}</p>
        <button onClick={handleBackToHome} className="mt-4 p-2 bg-blue-500 text-white">
          トップページへ戻る
        </button>
        <button onClick={handlePlayAgain} className="mt-4 p-2 bg-blue-500 text-white">
          もう一度遊ぶ
        </button>
      </div>
    </main>
  );
};

export default Result;
