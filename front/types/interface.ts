import { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface SelectComponentWithStateProps {
  modes: Mode[];
}

export interface SelectComponentProps {
  modes: Mode[];
  onSelect: (value: string) => void;
}

export interface SelectDifficultProps {
  options: string[];
  onSelect: (value: string) => void;
}

export interface Mode {
  id: number;
  name: string;
  path: string;
}

export interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  errorMessage: string | undefined;
  defaultValue?: any;
  register: UseFormRegister<any>;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  bgColor?: string;
  textColor: string;
  type: "button" | "submit" | "reset";
}

export interface Score {
  id: number;
  mode: string;
  difficulty: string;
  score: number;
}

export interface User {
  name: string;
  gender: string;
  user_high_note: string;
  user_low_note: string;
}

export interface EditProfileProps {
  userData: User;
  genders: Gender[];
  notes: Note[];
}

export interface Gender {
  id: number;
  name: string;
}

export interface Note {
  id: number;
  frequency: number;
  ja_note_name: string;
  en_note_name: string;
}
