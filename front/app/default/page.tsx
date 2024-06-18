import DifficultGenderSelect from '@/features/game/select/components/DifficultGenderSelect';
import { getDifficulties } from '@/lib/api/getDifficulties';
import { getGenders } from '@/lib/api/getGenders'
import { getModes } from '@/lib/api/getModes';
import { getProfile } from '@/lib/api/getProfile';
import React from 'react'

const Default = async () => {
  const genders = await getGenders();
  const difficulties = await getDifficulties();
  const userInfo = await getProfile();
  const modes = await getModes();

  return (
    <main className="text-white">
      <DifficultGenderSelect
        genders={genders}
        difficulties={difficulties}
        userInfo={userInfo}
        modes={modes}
      />
    </main>

  );
}

export default Default