"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { SelectDifficultComponent } from '../components/elements/Select/SelectDifficultComponent';
import { Button } from '../components/elements/Button/Button';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export const getGenders = async () => {
  const response = await axiosInstance.get("/genders");
  return response.data;
}

export const getDifficulties = async () => {
  const response = await axiosInstance.get("/difficulties");
  return response.data;
}

const fetchUserInfo = async () => {
  const uid = Cookies.get("uid") || '';
  const client = Cookies.get("client") || '';
  const accessToken = Cookies.get("access-token") || '';
  if (!uid || !client || !accessToken) {
    return null;
  }
  try {
    const response = await axiosInstance.get("user", {
      headers: {
        'uid': uid,
        'client': client,
        'access-token': accessToken,
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Default = () => {
  const [difficulty, setDifficulty] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [userInfo, setUserInfoState] = useState<any>(null);
  const [showGenderSelect, setShowGenderSelect] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    const initialize = async () => {
      try {
        const userInfo = await fetchUserInfo();
        setUserInfoState(userInfo);
        setShowGenderSelect(!userInfo || (!userInfo.gender && !userInfo.vocal_range));
        
        const gendersData = await getGenders();
        setGenders(gendersData.map((item: any) => item.name)); // nameのみの配列に変換

        const difficultiesData = await getDifficulties();
        setDifficulties(difficultiesData.map((item: any) => item.name)); // nameのみの配列に変換
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };

    initialize();
  }, []);

  const translateDifficulty = (difficulty: string) => {
    switch(difficulty) {
      case '簡単': return 'easy';
      case '普通': return 'normal';
      case '難しい': return 'hard';
      default: return difficulty;
    }
  };

  // const translateGender = (gender: string) => {
  //   switch(gender) {
  //     case '男性': return 'male';
  //     case '女性': return 'female';
  //     default: return gender;
  //   }
  // };

  const translateModeToJapanese = (mode: string | null) => {
    switch(mode) {
      case 'normal': return '通常';
      case 'practice': return '練習';
      case 'harmony': return 'ハーモニー';
      default: return mode;
    }
  };

  const handleStartClick = () => {
    if (!difficulty) {
      alert('難易度を選択してください');
      return;
    }
    if (showGenderSelect && !gender) {
      alert('性別を選択してください');
      return;
    }
    const translatedDifficulty = translateDifficulty(difficulty);
    const translatedGenderId = gender === '男性' ? 1 : gender === '女性' ? 2 : '';
    const path = `/game?mode=${mode}&difficulty=${translatedDifficulty}&genderId=${translatedGenderId}`;
    router.push(path);
  };

  return (
    <main className="text-white">
      <h1 className="text-4xl text-center mt-16">
        {translateModeToJapanese(mode)}モード
      </h1>
      <div className="mt-16 w-72 mx-auto text-2xl text-slate-300">
        <div className="mb-4">
          <label>難易度</label>
          <SelectDifficultComponent options={difficulties} onSelect={setDifficulty} />
        </div>
        {showGenderSelect && (
          <div className="mb-4">
            <label>性別</label>
            <SelectDifficultComponent options={genders} onSelect={setGender} />
          </div>
        )}
        <Button variant="outline" onClick={handleStartClick}>START</Button>
      </div>
    </main>
  );
};

export default Default;
