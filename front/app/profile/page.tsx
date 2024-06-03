import { Score } from '@/types/interface';
import { redirect } from "next/navigation";
import React from 'react'
import NextLink from '../components/elements/links/Link';
import { getUserData } from '@/services/user';

const profile = async () => {
  const userSession = await getUserData();
  console.log("response_data", userSession);

  if (!userSession) {
    redirect("/login");
    return;
  }

  const { user_high_note: highNote, user_low_note: lowNote, scores, gender } = userSession;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-x1 font-bold mb-4">プロフィール</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold mb-2">お名前：{userSession.name}</h2>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold mb-2">性別：{gender}</h2>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold mb-2">音域高：{highNote?.ja_note_name} ({highNote?.frequency} Hz)</h2>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold mb-2">音域低：{lowNote?.ja_note_name} ({lowNote?.frequency} Hz)</h2>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-lg font-semibold mb-2">スコア</h2>
        <ul>
          {scores.map((score: Score) => (
            <li key={score.id} className="mb-2">
              <div className="flex items-center">
                <h3 className="text-md font-semibold mr-2">モード：</h3>
                <p>{score.mode}</p>
              </div>
              <div className="flex items-center">
                <h3 className="text-md font-semibold mr-2">難易度：</h3>
                <p>{score.difficulty}</p>
              </div>
              <div className="flex items-center">
                <h3 className="text-md font-semibold mr-2">スコア：</h3>
                <p>{score.score}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center">
        <NextLink href="/edit" bgColor="bg-blue-500" textColor="text-white">
          編集
        </NextLink>
      </div>
    </div>
  );
}

export default profile
