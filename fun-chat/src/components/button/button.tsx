import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode | string;
  onClick?: () => void;
};

export function Button(props: ButtonProps) {
  const { children, onClick, ...rest } = props;
  return (
    <button {...rest} onClick={onClick}>
      {children}
    </button>
  );
}
