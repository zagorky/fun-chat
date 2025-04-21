import { useAuthStore } from '../../stores/use-auth-store.ts';

export function ErrorBlock() {
  const errors = useAuthStore((state) => state.errors);
  const authError = useAuthStore((state) => state.authError);

  return (
    <>
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
    </>
  );
}
