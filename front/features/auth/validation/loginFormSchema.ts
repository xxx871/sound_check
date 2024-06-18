import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email("適切なメールアドレスを入力してください。"),
  password: z
    .string()
    .min(6, {message: "パスワードは6文字以上で入力してください。"})
});
