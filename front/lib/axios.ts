import axios from "axios";

const getBaseURL = () => {
  if (typeof window === 'undefined') {
    return process.env.API_URL_SERVER;
  } else {
    return process.env.NEXT_PUBLIC_API_URL;
  }
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
});
