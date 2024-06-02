import axios from 'axios';
import { cookies } from 'next/headers';

export const axiosInstance = axios.create({
  baseURL: 'http://host.docker.internal:3000/api/v1/',
});

export const getUserData = async () => {
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

export const getGenders = async () => {
  const response = await axiosInstance.get("/genders");
  return response.data;
}

export const getNotes = async () => {
  const response = await axiosInstance.get("/notes");
  return response.data;
}

export const getDifficulties = async () => {
  const response = await axiosInstance.get("/difficulties");
  return response.data;
}