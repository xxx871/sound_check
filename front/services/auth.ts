import { LoginData, SignUpData } from "@/types/interface";
import axios from 'axios';
import Cookies from 'js-cookie'

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
    Cookies.set("access-token", response.headers["access-token"]);
    Cookies.set("client", response.headers["client"]);
    Cookies.set("uid", response.headers["uid"]);
    return response.data;
  } catch (error) {
    Cookies.remove("uid");
    Cookies.remove("client");
    Cookies.remove("access-token");
    throw error;
  }
};

export const Login = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("auth/sign_in", {
      email: data.email,
      password: data.password,
    });
    Cookies.set("access-token", response.headers["access-token"]);
    Cookies.set("client", response.headers["client"]);
    Cookies.set("uid", response.headers["uid"]);
    return response.data;
  } catch (error) {
    Cookies.remove("uid");
    Cookies.remove("client");
    Cookies.remove("access-token");
    throw error;
  }
};

export const signOut = async () => {
  const accessToken = Cookies.get("access-token") || '';
  const client = Cookies.get("client") || '';
  const uid = Cookies.get("uid") || '';
  const response = await axiosInstance.delete("auth/sign_out", {
    headers: {
      uid: uid,
      client: client,
      "access-token": accessToken
    }
  });
  Cookies.remove("uid");
  Cookies.remove("client");
  Cookies.remove("access-token");
  return response.data;
};
