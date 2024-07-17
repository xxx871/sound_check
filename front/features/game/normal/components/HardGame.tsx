import { GameUser, Note } from '@/types/interface';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getUserNotesRange } from '../../api/getUserNotesRange';
import { getGenderNotesRange } from '../../api/getGenderNotesRange';
import VoiceAnalysis from '../../components/VoiceAnalysis';

interface HardGameProps {
  userInfo: GameUser;
  notes: Note[];
  onResult: (isMatch: boolean) => void;
  onPitchDetected: (pitch: number, note: string) => void;
}

const getRandomNote = (notes: Note[]): Note => {
  const randomIndex = Math.floor(Math.random() * notes.length)
  return notes[randomIndex];
};

const HardGame: React.FC<HardGameProps> = ({ userInfo, notes, onResult, onPitchDetected }) => {
  const [noteInfo, setNoteInfo] = useState<{ en_note_name: string; ja_note_name: string; frequency: number } | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialize = async () => {
      try {
        let notes: Note[] =  [];

        if (userInfo) {
          const { user_high_note, user_low_note, gender_id } = userInfo;
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
        setNoteInfo({
          en_note_name: randomNote.en_note_name,
          ja_note_name: randomNote.ja_note_name,
          frequency: randomNote.frequency
        });
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };
    initialize();
  }, [userInfo]);

  return (
    <main className="text-white">
      <div className="mt-16 w-72 mx-auto text-2xl text-slate-300 text-center">
        {noteInfo && (
          <>
          <div className="mt-4 text-center">
            <p>{`現在の音: ${noteInfo.en_note_name}`}</p>
            <p>{`周波数: ${noteInfo.frequency}`}</p>
            <p>{`日本語の音名: ${noteInfo.ja_note_name}`}</p>
          </div>
          <VoiceAnalysis
            targetNote={noteInfo.en_note_name}
            notes={notes}
            onResult={onResult}
            onPitchDetected={onPitchDetected}
            difficulty="3"
          />
        </>
        )}
      </div>
    </main>
  )
}

export default HardGame