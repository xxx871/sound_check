import { axiosInstance } from "@/lib/axios";
import { Note } from "@/types/interface";

export const getGenderNotesRange = async (genderId: number): Promise<Note[]> => {
  try {
    const response = await axiosInstance(`/genders/notes/range/${genderId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching gender notes in range', error);
    return [];
  }
};