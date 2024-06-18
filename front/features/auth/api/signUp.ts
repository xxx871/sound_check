import { axiosInstance } from "@/lib/axios";
import Cookies from 'js-cookie';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const signUp =  async (data: SignUpData) => {
  try {
    const response = await axiosInstance.post("/auth", {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
    Cookies.set("uid", response.headers["uid"]);
    Cookies.set("client", response.headers["client"]);
    Cookies.set("access-token", response.headers["access-token"]);
    return response.data;
  } catch (error) {
    Cookies.remove("uid");
    Cookies.remove("client");
    Cookies.remove("access-token");
    throw error;
  }
};
