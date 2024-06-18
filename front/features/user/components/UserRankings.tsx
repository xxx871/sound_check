"use client"

import { Difficult, Mode } from '@/types/interface'
import React, { useEffect, useState } from 'react'
import { RankingEntry, getRanking } from '../api/getRanking';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserRankingsProps {
  modes: Mode[];
  difficulties: Difficult[];
}

const UserRankings: React.FC<UserRankingsProps> = ({ modes, difficulties }) => {
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [rankings, setRankings] = useState<RankingEntry[]>([]);

  useEffect(() => {
    if (selectedMode !== null && selectedDifficulty !== null) {
      const getUsersRanking = async () => {
        const rankingData = await getRanking(selectedMode, selectedDifficulty);
        setRankings(rankingData);
      };

      getUsersRanking();
    }
  }, [selectedMode, selectedDifficulty]);

  return (
    <div className="text-white max-w-sm mx-auto">
      <h1 className="text-6xl text-center mt-6">ランキング</h1>
      <div className="mt-8 text-2xl flex justify-between">
        <div>
          <label>モード</label>
          <Select onValueChange={(value) => setSelectedMode(Number(value))}>
            <SelectTrigger className="text-lg text-slate-300 w-40">
              <SelectValue placeholder="モード選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {modes.map((mode) => (
                  <SelectItem key={mode.id} value={mode.id.toString()}>
                    {mode.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label>難易度</label>
          <Select onValueChange={(value) => setSelectedDifficulty(Number(value))}>
            <SelectTrigger className="text-lg text-slate-300 w-40">
              <SelectValue placeholder="難易度選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty.id} value={difficulty.id.toString()}>
                    {difficulty.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-8 text-2xl">
        {rankings.length > 0 ? (
          rankings.map((ranking, index) => (
            <div key={index} className="mb-2">
              <p>No.{index + 1} {ranking.user.name} {ranking.score}回</p>
            </div>
          ))
        ) : (
          <p>ランキングデータがありません。</p>
        )}
      </div>
    </div>
  );
}

export default UserRankings