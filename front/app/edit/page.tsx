import EditProfile from '@/features/user/components/EditProfile';
import { getGenders, getNotes, getUserData } from '@/services/user';
import React from 'react'

const EditPage = async () => {
  const [userData, genders, notes] = await Promise.all([
    getUserData(),
    getGenders(),
    getNotes(),
  ]);

  if (!userData) {
    return <p>ユーザー情報が取得できませんでした。ログインしてください。</p>;
  }

  return  <EditProfile userData={userData} genders={genders} notes={notes} />;
}

export default EditPage