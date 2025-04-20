import type { ReactNode } from 'react';
import React from 'react';

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
    'transition-all',
    'duration-200',
    'ease-in-out',
    'border-gray-300',
    'bg-emerald-800',
    'text-white',
    'font-bold',
    'rounded-lg',
    'cursor-pointer',
    'hover:bg-emerald-700',
    'cursor-pointer',
    'disabled:bg-rose-200',
    'disabled:text-teal-950',
    'disabled:opacity-80',
    'disabled:pointer-events-none',
    `max-[750px]:min-w-15`,
    `max-[750px]:text-xs`,
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
