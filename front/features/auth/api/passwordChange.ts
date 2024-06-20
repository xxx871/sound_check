import { axiosInstance } from "@/lib/axios";
import Cookies from 'js-cookie';

interface PasswordChangeData {
  password: string;
  password_confirmation: string;
  reset_password_token: string | null;
}

export const passwordChange = async (data: PasswordChangeData) => {
  const queryParams = new URLSearchParams(window.location.search);
  const uid = queryParams.get('uid');
  const token = queryParams.get('access-token');
  const client = queryParams.get('client');

  try {
    const response = await axiosInstance.put("/auth/password", {
      password: data.password,
      password_confirmation: data.password_confirmation,
      reset_password_token: data.reset_password_token,
    }, {
      headers: {
        'uid': uid,
        'client': client,
        'access-token': token,
      }
    });
    if (response.status !== 200) throw new Error();
    if (response.data.success) {
      Cookies.set("uid", response.headers["uid"]);
      Cookies.set("client", response.headers["client"]);
      Cookies.set("access-token", response.headers["access-token"]);
    }
    return response.data;
  } catch (error) {
    Cookies.remove("uid");
    Cookies.remove("client");
    Cookies.remove("access-token");
    throw error;
  }
};
