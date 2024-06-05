"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { updateScore } from '@/services/score';
import axios from 'axios';

const modeMapping: { [key: string]: string } = {
  normal: "通常",
  practice: "練習",
  harmony: "ハモり"
};

const difficultyMapping: { [key: string]: string } = {
  easy: "簡単",
  normal: "普通",
  hard: "難しい"
};

const fetchModeId = async (mode: string) => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/modes');
    const modes = response.data;
    console.log("Fetched modes:", modes); // デバッグのためのログ
    const modeObj = modes.find((m: { name: string }) => m.name === modeMapping[mode]);
    return modeObj ? modeObj.id : 0;
  } catch (error) {
    console.error("Error fetching modes:", error);
    return 0;
  }
};

const fetchDifficultyId = async (difficulty: string) => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/difficulties');
    const difficulties = response.data;
    console.log("Fetched difficulties:", difficulties); // デバッグのためのログ
    const difficultyObj = difficulties.find((d: { name: string }) => d.name === difficultyMapping[difficulty]);
    return difficultyObj ? difficultyObj.id : 0;
  } catch (error) {
    console.error("Error fetching difficulties:", error);
    return 0;
  }
};

const Result = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const matchCount = parseInt(sessionStorage.getItem('matchCount') || '0', 10);
  const difficulty = searchParams.get('difficulty') || '';
  const mode = searchParams.get('mode') || '';
  const genderId = searchParams.get('genderId') || '';
  const [modeId, setModeId] = useState<number>(0);
  const [difficultyId, setDifficultyId] = useState<number>(0);

  useEffect(() => {
    const fetchIds = async () => {
      const fetchedModeId = await fetchModeId(mode);
      const fetchedDifficultyId = await fetchDifficultyId(difficulty);
      setModeId(fetchedModeId);
      setDifficultyId(fetchedDifficultyId);

      if (fetchedModeId > 0 && fetchedDifficultyId > 0 && matchCount > 0) {
        updateScore(fetchedModeId, fetchedDifficultyId, matchCount)
          .then(() => console.log("Score updated successfully"))
          .catch(error => console.error("Failed to update score", error));
      } else {
        console.error("Invalid parameters for updating score", { fetchedModeId, fetchedDifficultyId, matchCount });
      }
    };

    fetchIds();
  }, [mode, difficulty, matchCount]);

  const handleBackToHome = () => {
    sessionStorage.removeItem('matchCount'); // トップページに戻る際に一致回数を破棄
    router.push('/');
  };

  const handlePlayAgain = () => {
    router.push(`/game?mode=${mode}&difficulty=${difficulty}&genderId=${genderId}`);
  };

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
