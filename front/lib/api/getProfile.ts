import { axiosInstance } from "@/lib/axios";
import { cookies } from "next/headers";

export const getProfile = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access-token')?.value;
  const client = cookieStore.get('client')?.value;
  const uid = cookieStore.get('uid')?.value;

  if(!accessToken || !client || !uid) {
    return null;
  }

  try {
    const response = await axiosInstance.get('user', {
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
