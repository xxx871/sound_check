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

const fetchGender = async () => {
  const response = await axiosInstance.get("/genders");
  return response.data;
};

const fetchDifficult = async () => {
  const response = await axiosInstance.get("difficulties");
  return response.data;
};

const setUserInfo = async () => {
  const uid = Cookies.get("uid") || '';
  const client = Cookies.get("client") || '';
  const accessToken = Cookies.get("access-token") || '';
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
  const [userInfo, setUserInfoState] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await setUserInfo();
        setUserInfoState(data);
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleStartClick = () => {
    if (!difficulty) {
      alert('難易度を選択してください');
      return;
    }
    const path = `/game?mode=${mode}&difficulty=${difficulty}${userInfo ? '' : `&gender=${gender}`}`;
    router.push(path);
  };

  return (
    <main className="text-white">
      <h1 className="text-4xl text-center mt-16">
        通常モード
      </h1>
      <div className="mt-16 w-72 mx-auto text-2xl text-slate-300">
        <div className="mb-4">
          <label>難易度</label>
          <SelectDifficultComponent options={['簡単', '普通', '難しい']} onSelect={setDifficulty} />
        </div>
        {userInfo ? null : (
          <div className="mb-4">
            <label>性別</label>
            <SelectDifficultComponent options={['男性','女性']} onSelect={setGender}/>
          </div>
        )}
        <Button variant="outline" onClick={handleStartClick}>START</Button>
      </div>
    </main>
  );
};

export default Default;
