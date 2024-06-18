import ResultContent from '@/features/game/components/ResultContent';
import { getProfile } from '@/lib/api/getProfile'
import React from 'react'

const Result = async () => {
  const userInfo = await getProfile();

  return (
    <div>
      <ResultContent
        userInfo={userInfo}
      />
    </div>
  )
}

export default Result