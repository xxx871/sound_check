import { axiosInstance } from "@/lib/axios";

interface PasswordResetData {
  email: string;
}

export const passwordReset = async (data: PasswordResetData) => {
  try {
    const response = await axiosInstance.post("/auth/password", {
      email: data.email,
      redirect_url: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/password/change`
    });
    return response.data;
  } catch (error) {
    console.log('Error sending password reset email', error);
  }
};