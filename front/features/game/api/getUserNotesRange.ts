import { axiosInstance } from "@/lib/axios";
import { Note } from "@/types/interface";

export const getUserNotesRange = async (lowNoteName: string, highNoteName: string): Promise<Note[]> => {
  try {
    const response = await axiosInstance("/notes/range", {
      params: {
        low: lowNoteName,
        high: highNoteName,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error fetching notes in range', error);
    return [];
  }
};