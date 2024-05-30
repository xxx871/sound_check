import { Edit } from "@/services/auth";
import { EditFormSchema } from "@/types/formSchema";
import { User } from "@/types/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

export const useEditForm = (userData: User) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      name: userData.name,
      gender: userData.gender,
      user_high_note: userData.user_high_note,
      user_low_note: userData.user_low_note,
    },
  });

  const onSubmit = async (value: z.infer<typeof EditFormSchema>) => {
    const { name, gender, user_high_note, user_low_note } = value;
    setErrorMessage(null); // Clear previous error messages

    try {
      const response = await Edit({
        name,
        gender,
        user_high_note,
        user_low_note,
      });

      if (response.error) {
        setErrorMessage(response.error.message);
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch (error: any) {
      setErrorMessage(error.response?.data?.errors?.join(", ") || "エラーが発生しました。");
    }
  };

  return { form, onSubmit, errorMessage };
}
