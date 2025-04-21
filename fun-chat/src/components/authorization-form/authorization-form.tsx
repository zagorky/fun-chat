import { Input } from '../input/input.tsx';
import { Button } from '../button/button.tsx';
import { useAuthStore } from '../../stores/use-auth-store.ts';
import React, { useCallback } from 'react';
import { handleLoginSubmit } from '../../api/utils/authorization.ts';
import { ErrorBlock } from '../authorization-page-error-block/authorization-page-error-block.tsx';

export const AuthorizationForm = () => {
  const login = useAuthStore((state) => state.login);
  const password = useAuthStore((state) => state.password);
  const errors = useAuthStore((state) => state.errors);
  const setLogin = useAuthStore((state) => state.setLogin);
  const setPassword = useAuthStore((state) => state.setPassword);
  const clearAuthError = useAuthStore((state) => state.clearAuthError);

  const handleLoginChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLogin(event.target.value);
      clearAuthError();
    },
    [setLogin, clearAuthError],
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      clearAuthError();
    },
    [setPassword, clearAuthError],
  );

  return (
    <form
      className="flex items-center justify-center flex-col"
      name={'authForm'}
      onSubmit={handleLoginSubmit}
    >
      <Input
        type={'text'}
        id={'login'}
        placeholder={'Your login'}
        label={'Login'}
        value={login}
        onChange={handleLoginChange}
      />
      <Input
        type={'password'}
        id={'password'}
        placeholder={'Your password'}
        label={'Password'}
        value={password}
        onChange={handlePasswordChange}
      />
      <Button type={'submit'} disabled={!!errors.login || !!errors.password || !login || !password}>
        Login
      </Button>
      <ErrorBlock />
    </form>
  );
};
