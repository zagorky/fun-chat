import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode | string;
  onClick?: (event: React.UIEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export function Button(props: ButtonProps) {
  const style = [
    'min-w-24',
    'size-max',
    'px-1',
    'py-1',
    'border',
    'border-gray-300',
    'bg-emerald-500',
    'text-white',
    'rounded-lg',
    'hover:bg-emerald-900',
    'm-2',
    'cursor-pointer',
    'disabled:bg-rose-300',
    'disabled:opacity-60',
    'disabled:pointer-events-none',
  ];

  return (
    <button
      className={[...style].join(' ')}
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
