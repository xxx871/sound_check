// front/features/game/components/ResultContent.tsx
"use client"

import { User } from '@/types/interface'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { updateScore } from '../api/updateScore';
import { Button } from '@/components/ui/button';
import {
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

interface resultContentProps {
  userInfo: User;
}

const ResultContent: React.FC<resultContentProps> = ({ userInfo }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const handlePlayAgain = () => {
    setIsLoading(true);
    router.push(`/normal?modeId=${modeId}&difficultyId=${difficultyId}&genderId=${genderId}`);
  }

  const tweetText = `私は「音ピシャ」で連続${matchCount}回一致しました！あなたも挑戦してみてください！`;

  return (
    <main className="text-white">
      <h1 className="text-center mb-5 text-3xl font-medium mt-4">結果画面</h1>
      <div className="w-72 mx-auto text-2xl text-slate-300 text-center mt-16">
        <div>
          <p>連続で一致した回数: {matchCount}</p>
        </div>
        <div className="mt-16">
          <Button onClick={handleBackToHome} className="bg-blue-500 text-white w-32 h-12">
            トップページへ戻る
          </Button>
          <LoadingButton
            onClick={handlePlayAgain}
            className="bg-green-500 text-white w-32 h-12"
            isLoading={isLoading}
          >
            もう一度遊ぶ
          </LoadingButton>
          <TwitterShareButton
            url={window.location.href}
            title={tweetText}
            className="mt-4"
          >
            <TwitterIcon size={32} round />
            ツイートする
          </TwitterShareButton>
        </div>
      </div>
    </main>
  )
}

export default ResultContent;
