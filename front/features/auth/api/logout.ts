import { axiosInstance } from '@/lib/axios';
import Cookies from 'js-cookie'

export const logout = async () => {
  const uid = Cookies.get("uid") || '';
  const client = Cookies.get("client") || '';
  const accessToken = Cookies.get("access-token") || '';
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
