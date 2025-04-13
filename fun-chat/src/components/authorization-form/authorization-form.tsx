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
        type={'submit'}
        disabled={
          !!state.errors.login || !!state.errors.password || !state.login || !state.password
        }
      >
        Login
      </Button>
      {state.errors.password && <p>{state.errors.password}</p>}
      {state.errors.login && <p>{state.errors.login}</p>}
      {state.authError && (
        <div>
          {state.authError === 'incorrect password' && 'Invalid password'}
          {state.authError === 'there is no user with this login' && 'User not found'}
          {state.authError === 'a user with this login is already authorized' &&
            'User already logged in'}
          {state.authError === 'the user was not authorized' && 'User not authorized'}
          {state.authError === 'another user is already authorized in this connection' &&
            'Another user already authorized in this connection'}
        </div>
      )}
    </form>
  );
};
