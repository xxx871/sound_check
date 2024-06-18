import { getProfile } from '@/lib/api/getProfile'
import EditProfileForm from '@/features/user/components/EditProfileForm';
import { getGenders } from '@/lib/api/getGenders';
import { getNotes } from '@/lib/api/getNotes';
import { redirect } from 'next/navigation';
import React from 'react'

const Edit = async () => {
  const [userData, genders, notes] = await Promise.all([
    getProfile(),
    getGenders(),
    getNotes(),
  ]);

  if (!userData) {
    redirect("/login");
  }

  return (
    <div className="max-w-sm mx-auto mt-10">
      <EditProfileForm userData={userData} genders={genders} notes={notes} />
    </div>
  )
}

export default Edit