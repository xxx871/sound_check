import { axiosInstance } from '@/lib/axios';
import Cookies from 'js-cookie';

export const updateScore = async (modeId: number, difficultyId: number, score: number) => {
  const uid = Cookies.get("uid") || '';
  const client = Cookies.get("client") || '';
  const accessToken = Cookies.get("access-token") || '';

  try {
    const response = await axiosInstance.put("scores/update", {
      mode_id: modeId,
      difficulty_id: difficultyId,
      score: score,
    }, {
      headers: {
        'uid': uid,
        'client': client,
        'access-token': accessToken
      }
    });
    return response.data;
  } catch (error) {
    console.log("Failed to update score", error);
    throw error;
  }
};