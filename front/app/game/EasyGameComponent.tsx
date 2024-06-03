"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as Tone from "tone"
import { Button } from "../components/elements/Button/Button";
import { Note } from "@/types/interface";
import Cookies from "js-cookie"

interface UserInfo {
  id: number;
  name: string;
  gender_id?: number;
  user_high_note?: Note;
  user_low_note?: Note;
}

const getRandomNote = (notes: Note[]): Note => {
  const randomIndex = Math.floor(Math.random() * notes.length);
  return notes[randomIndex];
};

const fetchNotes = async (): Promise<Note[]> => {
  const response = await fetch("http://localhost:3000/api/v1/notes", {
    cache: 'force-cache',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  const notes: Note[] = await response.json();
  console.log("Fetched Notes:", notes); // フィルタリング前のノートリストを出力
  return notes;
};

const fetchUserInfo = async (): Promise<UserInfo | null> => {
  const uid = Cookies.get("uid") || '';
  const client = Cookies.get("client") || '';
  const accessToken = Cookies.get("access-token") || '';
  if (!uid || !client || !accessToken) {
    return null;
  }
  try {
    const response = await fetch("http://localhost:3000/api/v1/user", {
      headers: {
        'uid': uid,
        'client': client,
        'access-token': accessToken,
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    const userInfo: UserInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

const fetchGenderNotes = async (genderId: number): Promise<{ low_note: Note; high_note: Note} | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/genders/notes/${genderId}`, {
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch gender notes');
    }
    const notes = await response.json();
    return notes;
  } catch (error) {
    console.error('Error fetching gender notes:', error);
    return null;
  }
};

const EasyGameComponent = () => {
  const [note, setNote] = useState<Note | null>(null);
  const [noteName, setNoteName] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialize = async () => {
      try {
        const userInfo = await fetchUserInfo();
        let notes = await fetchNotes();

        if (userInfo) {
          const { user_high_note, user_low_note, gender_id } = userInfo;
          console.log("User Info:", userInfo);

          if (user_high_note && user_low_note) {
            console.log("User High Note:", user_high_note);
            console.log("User Low Note:", user_low_note);
            notes = notes.filter(note =>
              note.frequency >= user_low_note.frequency && note.frequency <= user_high_note.frequency
            );
            console.log("Filtered Notes by User Range:", notes);
          } else if (gender_id) {
            const genderNotes = await fetchGenderNotes(gender_id);
            if (genderNotes) {
              console.log("Gender High Note:", genderNotes.high_note);
              console.log("Gender Low Note:", genderNotes.low_note);
              notes = notes.filter(note =>
                note.frequency >= genderNotes.low_note.frequency && note.frequency <= genderNotes.high_note.frequency
              );
              console.log("Filtered Notes by Gender Range:", notes);
            }
          }
        } else {
          const genderId = parseInt(searchParams.get('genderId') || '', 10);
          if (!isNaN(genderId)) {
            const genderNotes = await fetchGenderNotes(genderId);
            if (genderNotes) {
              console.log("Gender High Note:", genderNotes.high_note);
              console.log("Gender Low Note:", genderNotes.low_note);
              notes = notes.filter(note =>
                note.frequency >= genderNotes.low_note.frequency && note.frequency <= genderNotes.high_note.frequency
              );
              console.log("Filtered Notes by Gender Range:", notes);
            }
          }
        }
        if (notes.length === 0) {
          console.error("No notes available after filtering");
          return;
        }
        const randomNote = getRandomNote(notes);
        setNote(randomNote);
        console.log("Random Note Selected:", randomNote);
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };
    initialize();
  }, []);

  const playNote = async () => {
    if (!note) {
      console.error("No note to play");
      return;
    }
    await Tone.start(); // ユーザーのジェスチャー内でAudioContextを開始
    setNoteName(note.ja_note_name); // Noteを再生する前にnoteNameを設定
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note.frequency, '2s');
    console.log("Playing Note:", note);
  };

  return (
    <main className="text-white">
      <div className="mt-16 w-72 mx-auto text-2xl text-slate-300">
        <Button variant="outline" onClick={playNote}>音を再生</Button>
        {noteName && <p className="mt-4 text-center">{`現在の音: ${noteName}`}</p>}
      </div>
    </main>
  )
}

export default EasyGameComponent;
