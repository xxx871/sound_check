import { GameUser, Note } from '@/types/interface';
import React from 'react'

interface HardGameProps {
  onPlayNote: (note: string) => void;
  userInfo: GameUser;
}

const getRandomNote = (notes: Note[]): Note => {
  const randomIndex = Math.floor(Math.random() * notes.length)
  return notes[randomIndex];
};

const HardGame: React.FC<HardGameProps> = ({ userInfo, onPlayNote}) => {
  

  return (
    <div className="text-white text-center mt-32 grid gap-16">
      <h1 className="text-8xl">難易度：難しい</h1>
      <h3 className="text-6xl">後日実装予定</h3>
    </div>
  )
}

export default HardGame