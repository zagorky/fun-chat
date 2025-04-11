import React from 'react';

type AuthorizationInputProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AuthorizationInput(props: AuthorizationInputProps) {
  const style = [
    'px-4',
    'py-2',
    'm-1',
    'border',
    'border-gray-300',
    'rounded-md',
    'shadow-sm',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-pink-500',
    'focus:border-pink-500',
    'transition',
    'duration-200',
  ];

  return (
    <React.Fragment>
      <label htmlFor={props.id}>
        {props.label}
        <input
          className={[...style].join(' ')}
          type={props.type}
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </label>
    </React.Fragment>
  );
}
