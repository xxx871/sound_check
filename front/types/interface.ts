import { UseFormRegister } from 'react-hook-form';

export interface SelectComponentWithStateProps {
  modes: Mode[];
}

export interface SelectComponentProps {
  modes: Mode[];
  onSelect: (modeId: string) => void;
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
