import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/interface";
import Cookies from 'js-cookie'

export const profileEdit = async (data: User) => {
  const uid = Cookies.get("uid") || '';
  const client = Cookies.get("client") || '';
  const accessToken = Cookies.get("access-token") || '';
  try {
    const response = await axiosInstance.put("user", {
      user: {
        name: data.name,
        gender: data.gender,
        high_note: data.user_high_note,
        low_note: data.user_low_note,
      }
    }, {
      headers: {
        'uid': uid,
        'client': client,
        'access-token': accessToken
      }
    });
    Cookies.set("uid", response.headers["uid"]);
    Cookies.set("client", response.headers["client"]);
    Cookies.set("access-token", response.headers["access-token"]);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errors) {
      throw new Error(error.response.data.errors);
    } else {
      throw error;
    }
  }
};