import { Note, User } from "@/types/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { profileEdit } from "../api/profileEdit";
import { EditFormSchema } from "../validation/EditFormSchema";

export const useEditForm = (userData: User, notes: Note[]) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      name: userData.name,
      gender: userData.gender ?? '',
      user_high_note: userData.user_high_note?.ja_note_name ?? '',
      user_low_note: userData.user_low_note?.ja_note_name ?? '',
    },
  });

  const onSubmit = async (value: z.infer<typeof EditFormSchema>) => {
    const {name, gender, user_high_note, user_low_note} = value;
    setErrorMessage(null);

  const highNote = notes.find(note => note.ja_note_name === user_high_note) ?? null;
  const lowNote = notes.find(note => note.ja_note_name === user_low_note) ?? null;

  if (user_high_note && !highNote) {
    setErrorMessage("指定された音域高が見つかりません");
    return;
  }

  if (user_low_note && !lowNote) {
    setErrorMessage("指定された音域低が見つかりません");
    return;
  }

  try {
    const response = await profileEdit({
      name,
      gender: gender ?? '',
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
      setErrorMessage(error.message || "エラーが発生しました。");
    }
  };
  return { form, onSubmit, errorMessage };
}