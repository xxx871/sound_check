import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "@/types/formSchema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Login } from "@/services/auth";

export const useLoginForm = () => {
  const router = useRouter();

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof LoginFormSchema>) => {
    const { email, password } = value;
    console.log(value);
    try {
      const response = await Login({
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
      console.log(error.response);
    }
  };

  return { form, onSubmit };
};