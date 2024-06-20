import { z } from "zod";

export const passwordResetFormSchema = z.object({
  email: z
    .string()
    .email("適切なメールアドレスを入力してください。"),
});