import { SignUpData } from "@/types/interface";
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export const signUp = async (data: SignUpData) => {
  try {
    const response = await axiosInstance.post("auth", {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
