import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string()
    .min(2, {message: "ユーザー名は2文字以上で入力してください。"}),
  email: z
    .string()
    .email("適切なメールアドレスを入力してください。"),
  password: z
    .string()
    .min(6, {message: "パスワードは6文字以上で入力してください。"}),
  password_confirmation: z
    .string()
    .min(2, {message: "パスワードを再入力してください。"}),
}).superRefine((data, ctx) => {
  if (data.password !== data.password_confirmation) {
    ctx.addIssue({
      path: ["password_confirmation"],
      message: "パスワードが一致しません。",
      code: z.ZodIssueCode.custom
    });
  }
});
