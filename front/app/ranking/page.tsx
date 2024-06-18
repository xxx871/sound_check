import UserRankings from '@/features/user/components/UserRankings';
import { getDifficulties } from '@/lib/api/getDifficulties';
import { getModes } from '@/lib/api/getModes'
import React from 'react'

const Ranking = async () => {
  const modes = await getModes();
  const difficulties = await getDifficulties();

  return (
    <>
      <UserRankings
        modes={modes}
        difficulties={difficulties}
      />
    </>
  )
}

export default Ranking