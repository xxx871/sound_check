import { axiosInstance } from "@/lib/axios"

export interface RankingEntry {
  user: {
    name: string;
  };
  score: number;
}

export const getRanking = async (selectedMode: number, selectedDifficulty: number): Promise<RankingEntry[]> => {
  const response = await axiosInstance.get('/scores/ranking', {
    params: {
      mode_id: selectedMode,
      difficulty_id: selectedDifficulty
    }
  });
  return response.data;
};