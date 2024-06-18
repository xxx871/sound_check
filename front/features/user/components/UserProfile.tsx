import { Score } from '@/types/interface';
import React from 'react'

interface UserProfileProps {
  name: string;
  gender: string;
  highNote: { ja_note_name: string, frequency: number } | null;
  lowNote: { ja_note_name: string, frequency: number } | null;
  scores: Score[];
}

const UserProfile: React.FC<UserProfileProps> = ({ name, gender, highNote, lowNote, scores }) => {
  return (
    <div>
      <h1 className="text-center mb-5 text-3xl font-medium text-white">プロフィール</h1>

      <div className="bg-white shadow-md rounded p-4 mt-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold">名前：{name}</h2>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded p-4 mt-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold">性別：{gender}</h2>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded p-4 mt-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold">音域高：{highNote?.ja_note_name} ({highNote?.frequency} Hz)</h2>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded p-4 mt-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold">音域低：{lowNote?.ja_note_name} ({lowNote?.frequency} Hz)</h2>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded p-4 mt-4">
        <h2 className="text-2xl font-semibold mt-4">スコア：</h2>
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
    </div>
  )
}

export default UserProfile