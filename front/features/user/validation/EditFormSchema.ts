import { z } from "zod";

export const EditFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "ユーザー名は2文字以上で入力してください。" }),
  gender: z.string().optional(),
  user_high_note: z.string().optional(),
  user_low_note: z.string().optional(),
}).superRefine((data, ctx) => {
  if ((data.user_high_note && !data.user_low_note) || (!data.user_high_note && data.user_low_note)) {
    ctx.addIssue({
      path: ['user_high_note'],
      message: '音域高と音域低は両方とも入力するか、どちらも空にしてください。',
      code: z.ZodIssueCode.custom,
    });
    ctx.addIssue({
      path: ['user_low_note'],
      message: '音域高と音域低は両方とも入力するか、どちらも空にしてください。',
      code: z.ZodIssueCode.custom,
    });
  }
});