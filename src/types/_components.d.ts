export interface IInput {
  type: string;
  onChange: (value: React.FormEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  prefixIcon?: string;
  value: string;
  placeholder?: string;
  name: string;
  className?: string;
  error: boolean | string | undefined;
}

export interface IAutoComplete {
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  prefixIcon?: string;
  options: Array<{ value: string }>;
  placeholder?: string;
  className?: string;
  error: boolean | string | undefined;
}

export interface ITextarea {
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
  prefixIcon?: string;
  value: string;
  placeholder?: string;
  name: string;
  className?: string;
  error: boolean | string | undefined;
}

export interface IButton {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  isLoading?: boolean;
  type?: 'submit';
}

export interface ICheckBox {
  name: string;
  label: string;
  value: string;
  className?: string;
  onChange: (value: React.FormEvent<HTMLInputElement>) => void;
}

export interface IPrivateRoute {
  component: React.FC;
  [x: string]: any;
}

export interface IDashBoardLayout {
  children: React.ReactNode;
}

export interface IEditUser {
  handleChangeView(): void;
}
