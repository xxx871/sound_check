import axiosInstance from '@/utils/axiosInstance';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import React from 'react'

export interface Score {
  id: number;
  mode: string;
  difficulty: string;
  score: number;
}

  
const getUserData = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access-token')?.value;
  const client = cookieStore.get('client')?.value;
  const uid = cookieStore.get('uid')?.value;

  if(!accessToken || !client || !uid) {
    return null;
  }

  try {
    const response = await axiosInstance.get('user', {
      headers: {
        uid: uid,
        client: client,
        "access-token": accessToken
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

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
          <h2 className="text-lg font-semibold mb-2">音域高：{highNote} (Hz)</h2>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold mb-2">音域低：{lowNote} (Hz)</h2>
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

      </div>
    </div>
  );
}

export default profile