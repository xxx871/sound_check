import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/types/formSchema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUp } from "@/services/auth";

export const useSignupForm = () => {
  const router = useRouter();

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
    const { name, email, password, password_confirmation } = value;
    console.log(value);
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
      console.log(error.response);
    }
  };

  return { form, onSubmit };
};