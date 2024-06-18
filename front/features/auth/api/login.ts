import { axiosInstance } from "@/lib/axios";
import Cookies from 'js-cookie';

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("/auth/sign_in", {
      email: data.email,
      password: data.password,
    });
    Cookies.set("uid", response.headers["uid"]);
    Cookies.set("client", response.headers["client"]);
    Cookies.set("access-token", response.headers["access-token"]);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      Cookies.remove("uid");
      Cookies.remove("client");
      Cookies.remove("access-token");
      throw new Error(error.response.data.errors ? error.response.data.errors[0] : "ログインに失敗しました");
    } else {
      throw new Error("ログインに失敗しました");
    }
  }
};
