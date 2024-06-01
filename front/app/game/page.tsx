"use client"

import { axiosInstance } from '@/services/auth';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import * as Tone from 'tone';
import { Button } from '../components/elements/Button/Button';

const Game = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const difficulty = searchParams.get('difficulty');
  const gender = searchParams.get("gender");
  const [note, setNote] = useState<string>('');
  const [userNote, setUserNote] = useState<string>('');
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchNote = async
  // })

  const playNote = async () => {
    const synth = new Tone.Synth().toDestination();
    await Tone.start();
    synth.triggerAttackRelease(note, '8n');
  };

  const handleUserNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNote(e.target.value);
  };

  const checkNote = async () => {
    if (userNote === note) {
      setCorrectAnswers(prev => prev + 1);
      try {
        await axiosInstance.post('/scores', {
          mode,
          difficulty,
          score: 1,
        });
      } catch (error) {
        console.error('Error', error);
      }
    } else {
      alert('Try Again!');
    }
  };

  const handleFinishGame = () => {
    router.push(`/result?correctAnswers=${correctAnswers}`)
  }

  return (
    <main className="text-white">
      <h1 className="text-4xl text-center mt-16">
        ゲーム画面
      </h1>
      <div className="mt-16 w-72 mx-auto text-2xl text-slate-300">
        <Button variant="outline" onClick={playNote}>音を再生</Button>
        <div className="mt-4">
          <input type="text" value={userNote} onChange={handleUserNoteChange} placeholder="あなたの音を入力" />
        </div>
        <Button variant="outline" onClick={checkNote}>判定する</Button>
        <Button variant="outline" onClick={handleFinishGame}>ゲーム終了</Button>
      </div>
    </main>
  )
}

export default Game