import { cookies } from 'next/headers';
import { axiosInstance } from './axios';

export const getUserSession = async () => {
  const cookieStore = cookies();
  const uid = cookieStore.get('uid')?.value;
  const client = cookieStore.get('client')?.value;
  const accessToken = cookieStore.get('access-token')?.value;

  if (!uid || !client || !accessToken) {
    return null;
  }

  try {
    const response = await axiosInstance.get("auth/sessions", {
      headers: {
        uid: uid,
        client: client,
        "access-token": accessToken,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user session:", error);
    return null; // エラーが発生した場合もnullを返す
  }
};
