export interface Score {
  id: number;
  mode: string;
  difficulty: string;
  score: number;
};

export interface User {
  name: string;
  gender: string | null;
  user_high_note: Note | null;
  user_low_note: Note | null;
};

export interface GameUser {
  name: string;
  gender: string | null;
  user_high_note: Note | null;
  user_low_note: Note | null;
  gender_id: number;
};

export interface Gender {
  id: number;
  name: string;
};

export interface Note {
  id: number;
  frequency: number;
  ja_note_name: string;
  en_note_name: string;
};

export interface Mode {
  id: number;
  name: string;
};

export interface Difficult {
  id: number;
  name: string;
};