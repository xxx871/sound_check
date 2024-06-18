import { axiosInstance } from "../axios"

export const getModes = async () => {
  const response = await axiosInstance.get("/modes");
  return response.data;
};