import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "../validation/loginFormSchema";
import { z } from "zod";
import { login } from "../api/login";
import { useState } from "react";

export const useLoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit= async (value: z.infer<typeof loginFormSchema>) => {
    const { email, password } = value;
    try {
      const response = await login({
        email,
        password
      });

      if (response.error) {
        console.log(response.error.message);
        throw response.error;
      }

      router.push("/");
      router.refresh();
    } catch (error: any) {
      setServerError(error.message);
    }
  };

  return { form, onSubmit, serverError };
};