"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

// 型定義を追加
interface Mode {
  id: number;
  name: string;
}

interface Difficulty {
  id: number;
  name: string;
}

interface RankingEntry {
  user: {
    name: string;
  };
  score: number;
}

const fetchRanking = async (modeId: number, difficultyId: number): Promise<RankingEntry[]> => {
  const response = await axios.get('http://localhost:3000/api/v1/scores/ranking', {
    params: {
      mode_id: modeId,
      difficulty_id: difficultyId
    },
    headers: {
      uid: Cookies.get("uid") || '',
      client: Cookies.get("client") || '',
      'access-token': Cookies.get("access-token") || ''
    }
  });
  return response.data;
};

const fetchModes = async (): Promise<Mode[]> => {
  const response = await axios.get('http://localhost:3000/api/v1/modes');
  return response.data;
};

const fetchDifficulties = async (): Promise<Difficulty[]> => {
  const response = await axios.get('http://localhost:3000/api/v1/difficulties');
  return response.data;
};

const RankingPage = () => {
  const [modes, setModes] = useState<Mode[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  useEffect(() => {
    const initialize = async () => {
      const modesData = await fetchModes();
      setModes(modesData);
      const difficultiesData = await fetchDifficulties();
      setDifficulties(difficultiesData);
    };

    initialize();
  }, []);

  useEffect(() => {
    if (selectedMode !== null && selectedDifficulty !== null) {
      const getRanking = async () => {
        const rankingData = await fetchRanking(selectedMode, selectedDifficulty);
        setRanking(rankingData);
      };

      getRanking();
    }
  }, [selectedMode, selectedDifficulty]);

  return (
    <main className="text-white">
      <h1 className="text-4xl text-center mt-16">ランキング</h1>
      <div className="mt-16 w-72 mx-auto text-2xl text-slate-300">
        <div className="mb-4">
          <label>モード</label>
          <select
            defaultValue=""
            onChange={(e) => setSelectedMode(Number(e.target.value))}
            className="w-full p-2 rounded-md bg-gray-800 text-white"
          >
            <option value="" disabled>モードを選択</option>
            {modes.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label>難易度</label>
          <select
            defaultValue=""
            onChange={(e) => setSelectedDifficulty(Number(e.target.value))}
            className="w-full p-2 rounded-md bg-gray-800 text-white"
          >
            <option value="" disabled>難易度を選択</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty.id} value={difficulty.id}>
                {difficulty.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-8">
          {ranking.length > 0 ? (
            ranking.map((entry, index) => (
              <div key={index} className="mb-2">
                <p>No.{index + 1} {entry.user.name} {entry.score}回</p>
              </div>
            ))
          ) : (
            <p>ランキングデータがありません</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default RankingPage;
