import { z } from "zod";

export const passwordChangeFormSchema = z.object({
  password: z
    .string()
    .min(6, {message: "パスワードは6文字以上で入力してください。"}),
  password_confirmation: z
    .string()
    .min(2, {message: "パスワードを再入力してください。"}),
    // reset_password_token: z.string().nonempty("トークンが必要です。"),
}).superRefine((data, ctx) => {
  if (data.password !== data.password_confirmation) {
    ctx.addIssue({
      path: ["password_confirmation"],
      message: "パスワードが一致しません。",
      code: z.ZodIssueCode.custom
    });
  }
});
