import { Edit } from "@/services/auth";
import { EditFormSchema } from "@/types/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { User, Note } from "@/types/interface";

export const useEditForm = (userData: User, notes: Note[]) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      name: userData.name,
      gender: userData.gender,
      user_high_note: userData.user_high_note.ja_note_name, // 修正
      user_low_note: userData.user_low_note.ja_note_name, // 修正
    },
  });

  const onSubmit = async (value: z.infer<typeof EditFormSchema>) => {
    const { name, gender, user_high_note, user_low_note } = value;
    setErrorMessage(null); // Clear previous error messages

    const highNote = notes.find(note => note.ja_note_name === user_high_note);
    const lowNote = notes.find(note => note.ja_note_name === user_low_note);

    if (!highNote || !lowNote) {
      setErrorMessage("指定された音域が見つかりません");
      return;
    }

    try {
      const response = await Edit({
        name,
        gender,
        user_high_note: highNote,
        user_low_note: lowNote,
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
