import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import { Button } from "../components/elements/Button/Button";
import { Note } from "@/types/interface";
import Cookies from "js-cookie";

interface UserInfo {
  id: number;
  name: string;
  gender: string;
  user_high_note?: Note | null;
  user_low_note?: Note | null;
}

interface EasyGameComponentProps {
  onPlayNote: (note: string) => void;
}

const getRandomNote = (notes: Note[]): Note => {
  const randomIndex = Math.floor(Math.random() * notes.length);
  return notes[randomIndex];
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
    console.log("Fetched User Info:", userInfo);
    return userInfo;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

const fetchGenderNotesRange = async (genderId: number): Promise<Note[]> => {
  console.log(`Fetching gender notes range for genderId: ${genderId}`); // ここでログを追加
  try {
    const response = await fetch(`http://localhost:3000/api/v1/genders/notes/range/${genderId}`, {
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch gender notes range');
    }
    const notes: Note[] = await response.json();
    console.log("Fetched Gender Notes Range:", notes);
    return notes;
  } catch (error) {
    console.error('Error fetching gender notes range:', error);
    return [];
  }
};

const fetchNotesInRange = async (lowNoteName: string, highNoteName: string): Promise<Note[]> => {
  const url = new URL(`http://localhost:3000/api/v1/notes/range`);
  url.searchParams.append('low', lowNoteName);
  url.searchParams.append('high', highNoteName);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch notes in range');
    }
    const notes: Note[] = await response.json();
    console.log("Fetched Notes In Range:", notes);
    return notes;
  } catch (error) {
    console.error('Error fetching notes in range:', error);
    return [];
  }
};

const getGenderId = (gender: string): number | undefined => {
  switch (gender) {
    case '男性':
      return 1;
    case '女性':
      return 2;
    default:
      return undefined;
  }
};

const EasyGameComponent: React.FC<EasyGameComponentProps> = ({ onPlayNote }) => {
  const [note, setNote] = useState<Note | null>(null);
  const [noteName, setNoteName] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialize = async () => {
      try {
        const userInfo = await fetchUserInfo();
        let notes: Note[] = [];
  
        if (userInfo) {
          const { user_high_note, user_low_note, gender } = userInfo;
          console.log("User Info:", userInfo);
  
          const gender_id = getGenderId(gender);
  
          if (user_high_note && user_low_note) {
            console.log("User High Note:", user_high_note);
            console.log("User Low Note:", user_low_note);
  
            notes = await fetchNotesInRange(user_low_note.en_note_name, user_high_note.en_note_name);
            console.log("Notes in range:", notes);
          } else if (gender_id !== undefined) {
            console.log(`Fetching notes for gender_id: ${gender_id}`);
            notes = await fetchGenderNotesRange(gender_id);
            console.log("Notes for gender range:", notes);
          } else {
            console.log("Gender ID is undefined. Skipping gender-based note fetch.");
          }
        } else {
          const genderId = parseInt(searchParams.get('genderId') || '', 10);
          if (!isNaN(genderId)) {
            console.log(`Fetching notes for genderId: ${genderId}`);
            notes = await fetchGenderNotesRange(genderId);
            console.log("Notes for gender range:", notes);
          }
        }
  
        console.log("Final Notes List:", notes); // Add this line
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
    setNoteName(note.en_note_name); // Noteを再生する前にnoteNameを設定
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note.en_note_name, '2s'); // frequencyではなくen_note_nameを使用
    console.log("Playing Note:", note);
    onPlayNote(note.en_note_name);
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
