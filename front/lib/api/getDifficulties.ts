import { axiosInstance } from "../axios"

export const getDifficulties = async () => {
  const response = await axiosInstance.get("/difficulties");
  return response.data;
};