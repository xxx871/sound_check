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