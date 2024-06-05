import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export const updateScore = async (modeId: number, difficultyId: number, score: number) => {
  const accessToken = Cookies.get("access-token") || '';
  const client = Cookies.get("client") || '';
  const uid = Cookies.get("uid") || '';

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
    console.error("Failed to update score", error);
    throw error;
  }
};
