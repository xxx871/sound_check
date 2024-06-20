import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { passwordReset } from "../api/passwordReset";
import { passwordResetFormSchema } from "../validation/passwordResetFormSchema";

export const usePasswordResetForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(passwordResetFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof passwordResetFormSchema>) => {
    const { email } = value;
    try {
      const response = await passwordReset({
        email
      });

      if (response.error) {
        console.log(response.error.message);
        throw response.error;
      }
    } catch (error: any) {
      setServerError(error.message);
    }
  };

  return { form, onSubmit, serverError };
}