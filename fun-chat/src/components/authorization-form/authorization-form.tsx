import { AuthorizationInput } from '../authorization-input/authorization-input.tsx';
import { Button } from '../button/button.tsx';
import { useAuthStore } from '../../store/use-auth-store.ts';
import { useCallback } from 'react';

export const AuthorizationForm = () => {
  const login = useAuthStore((state) => state.login);
  const password = useAuthStore((state) => state.password);
  const errors = useAuthStore((state) => state.errors);
  const authError = useAuthStore((state) => state.authError);
  const setLogin = useAuthStore((state) => state.setLogin);
  const setPassword = useAuthStore((state) => state.setPassword);
  const validateAndSubmit = useAuthStore((state) => state.validateAndSubmit);
  const clearAuthError = useAuthStore((state) => state.clearAuthError);

  const formStyle = ['flex', 'items-center', 'justify-center', 'flex-col'];

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
    [setPassword],
  );

  return (
    <form className={[...formStyle].join(' ')} name={'authForm'} onSubmit={validateAndSubmit}>
      <AuthorizationInput
        type={'text'}
        id={'login'}
        placeholder={'Your login'}
        label={'Login'}
        value={login}
        onChange={handleLoginChange}
      />
      <AuthorizationInput
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
      {errors.password && <p>{errors.password}</p>}
      {errors.login && <p>{errors.login}</p>}
      {authError && (
        <div>
          {authError === 'incorrect password' && 'Invalid password'}
          {authError === 'there is no user with this login' && 'User not found'}
          {authError === 'a user with this login is already authorized' && 'User already logged in'}
          {authError === 'the user was not authorized' && 'User not authorized'}
          {authError === 'another user is already authorized in this connection' &&
            'Another user already authorized in this connection'}
        </div>
      )}
    </form>
  );
};
