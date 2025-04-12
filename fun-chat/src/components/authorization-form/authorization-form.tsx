import React from 'react';
import type { InitialStateType } from '../../routes/authorization-page.tsx';
import { AuthorizationInput } from '../authorization-input/authorization-input.tsx';
import { Button } from '../button/button.tsx';

type AuthorizationFormProps = {
  state: InitialStateType;
  onLoginChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  onSubmit: (event: React.FormEvent) => void;
};
export const AuthorizationForm = (props: AuthorizationFormProps) => {
  const { state, onLoginChange, onPasswordChange, onSubmit } = props;
  const formStyle = ['flex', 'items-center', 'justify-center', 'flex-col'];

  return (
    <form className={[...formStyle].join(' ')} name={'authForm'} onSubmit={onSubmit}>
      <AuthorizationInput
        type={'text'}
        id={'login'}
        placeholder={'Your login'}
        label={'Login'}
        value={state.login}
        onChange={onLoginChange}
      />
      <AuthorizationInput
        type={'password'}
        id={'password'}
        placeholder={'Your password'}
        label={'Password'}
        value={state.password}
        onChange={onPasswordChange}
      />
      <Button
        children={'Login'}
        type={'submit'}
        disabled={
          !!state.errors.login || !!state.errors.password || !state.login || !state.password
        }
      />
      {state.errors.password && <p>{state.errors.password}</p>}
      {state.errors.login && <p>{state.errors.login}</p>}
    </form>
  );
};
