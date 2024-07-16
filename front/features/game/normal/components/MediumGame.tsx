import { Note, GameUser } from '@/types/interface';
import React, { useEffect, useState } from 'react'
import * as Tone from "tone";
import { getUserNotesRange } from '../../api/getUserNotesRange';
import { getGenderNotesRange } from '../../api/getGenderNotesRange';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface EasyGameProps {
  onPlayNote: (note: string) => void;
  userInfo: GameUser;
}

const getRandomNote = (notes: Note[]): Note => {
  const randomIndex = Math.floor(Math.random() * notes.length);
  return notes[randomIndex];
};

const EasyGame: React.FC<EasyGameProps> = ({ userInfo, onPlayNote }) => {
  const [note, setNote] = useState<Note | null>(null);
  const [noteInfo, setNoteInfo] = useState<{ en_note_name: string; ja_note_name: string; frequency: number } | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialize = async () => {
      try {
        let notes: Note[] = [];

        if (userInfo) {
          const { user_high_note, user_low_note, gender, gender_id } = userInfo;
          if (user_high_note && user_low_note) {
            notes = await getUserNotesRange(user_high_note.en_note_name, user_low_note.en_note_name)
          } else if (gender_id !== undefined) {
            notes = await getGenderNotesRange(gender_id!);
          } else {
            console.log("Gender ID is undefined.");
          }
        } else {
          const genderId = parseInt(searchParams.get('genderId') || '', 10);
          if (!isNaN(genderId)) {
            notes = await getGenderNotesRange(genderId);
          }
        }
        if (notes.length === 0) {
          console.error("No notes available after filtering");
          return;
        }
        const randomNote = getRandomNote(notes);
        setNote(randomNote);
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };
    initialize();
  }, [userInfo]);

  const playNote = async () => {
    if (!note) {
      console.log("No note to play", Error);
      return;
    }
    await Tone.start();
    setNoteInfo({ en_note_name: note.en_note_name, ja_note_name: note.ja_note_name, frequency: note.frequency });
    const synth = new Tone.PolySynth().toDestination();
    synth.triggerAttackRelease(note.en_note_name, '1s');
    onPlayNote(note.en_note_name);
  };

  return (
    <main className="text-white">
      <div className="mt-16 w-72 mx-auto text-2xl text-slate-300 text-center">
        <Button variant="outline" onClick={playNote}>音を再生</Button>
        {noteInfo && (
          <div className="mt-4 text-center">
            <p>{`現在の音: ${noteInfo.en_note_name}`}</p>
            <p>{`周波数: ${noteInfo.frequency}`}</p>
            <p>{`日本語の音名: ${noteInfo.ja_note_name}`}</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default EasyGame