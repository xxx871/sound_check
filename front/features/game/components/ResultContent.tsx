"use client"

import { User } from '@/types/interface'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { updateScore } from '../api/updateScore';
import { Button } from '@/components/ui/button';

interface resultContentProps {
  userInfo: User;
}

const ResultContent: React.FC<resultContentProps> = ({ userInfo }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeId = parseInt(searchParams.get('modeId') || '0', 10);
  const difficultyId = parseInt(searchParams.get('difficultyId') || '0', 10);
  const genderId = parseInt(searchParams.get('genderId') || '', 10);
  const matchCount = parseInt(sessionStorage.getItem('matchCount') || '0', 10);

  useEffect(() => {
    if (userInfo && modeId > 0 && difficultyId > 0 && matchCount > 0) {
      updateScore(modeId, difficultyId, matchCount)
        .catch(error => console.error("Failed to update score", error));
    }
  }, [userInfo, modeId, difficultyId, matchCount]);

  const handleBackToHome = () => {
    sessionStorage.removeItem('matchCount');
    router.push('/');
  };

  const handlePlayAgain= () => {
    router.push(`/normal?modeId=${modeId}&difficultyId=${difficultyId}&genderId=${genderId}`);
  }

  return (
    <main className="text-white">
      <h1 className="text-center mb-5 text-3xl font-medium mt-4">結果画面</h1>
      <div className="w-72 mx-auto text-2xl text-slate-300 text-center mt-16">
        <div>
          <p>連続で一致した回数: {matchCount}</p>
        </div>
        <div className="mt-16">
          <Button onClick={handleBackToHome} className="mt-4 p-2 bg-blue-500 text-white">
            トップページへ戻る
          </Button>
          <Button onClick={handlePlayAgain}>
            もう一度遊ぶ
          </Button>
        </div>
      </div>
    </main>
  )
}

export default ResultContent