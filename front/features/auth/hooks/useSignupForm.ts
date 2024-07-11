import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUp } from "../api/signUp";
import { useState } from "react";
import { signUpFormSchema } from "../validation/signUpFormSchema";

export const useSignupForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof signUpFormSchema>) => {
    setIsLoading(true);
    const { name, email, password, password_confirmation } = value;
    try {
      const response = await signUp({
        name,
        email,
        password,
        password_confirmation
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
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, serverError, isLoading };
};