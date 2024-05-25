import axiosInstance from '@/utils/axiosInstance';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import React from 'react'

  
const getUserData = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access-token')?.value;
  const client = cookieStore.get('client')?.value;
  const uid = cookieStore.get('uid')?.value;

  if(!accessToken || !client || !uid) {
    return null;
  }

  try {
    const response = await axiosInstance.get('users', {
      headers: {
        uid: uid,
        client: client,
        "access-token": accessToken
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const profile = async () => {
  const userSession = await getUserData();

  if (!userSession) {
    redirect("/login");
    return;
  }

  const { user_high_note: highNote, user_low_note: lowNote, scores, gender } = userSession;

  return (
    <div>profile</div>
  )
}

export default profile