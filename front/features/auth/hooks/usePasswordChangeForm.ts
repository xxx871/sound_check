import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { passwordChangeFormSchema } from "../validation/passwordChangeFormSchema";
import { z } from "zod";
import { passwordChange } from "../api/passwordChange";

export const usePasswordChangeForm = () => {
  const router = useRouter();
  const [serverError, setServerError ] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const reset_password_token = searchParams.get('reset_password_token');

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(passwordChangeFormSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof passwordChangeFormSchema>) => {
    const { password, password_confirmation } = value;
    try {
      const response = await passwordChange({
        password,
        password_confirmation,
        reset_password_token,
      });

      if (response.error) {
        console.log(response.error.message);
        throw response.error;
      }
      router.push("/");
      router.refresh();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.errors.full_messages ? error.response.data.errors.full_messages[0] : "登録中にエラーが発生しました。";
        setServerError(errorMessage);
      } else {
        setServerError("登録中にエラーが発生しました。");
      }
    }
  };

  return { form, onSubmit, serverError };
};