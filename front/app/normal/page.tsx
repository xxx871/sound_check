

import GameContainer from '@/features/game/normal/components/GameContainer';
import { getNotes } from '@/lib/api/getNotes';
import { getProfile } from '@/lib/api/getProfile'
import React from 'react'

const Normal = async () => {
  const userInfo = await getProfile();
  const notes = await getNotes();

  return (
    <div>
      <GameContainer userInfo={userInfo} notes={notes}/>
    </div>
  )
}

export default Normal