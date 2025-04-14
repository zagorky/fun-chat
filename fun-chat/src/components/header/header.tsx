import { Button } from '../button/button.tsx';
import { Link } from '@tanstack/react-router';
import { useAuthStore } from '../../store/use-auth-store.ts';

export function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const userName = useAuthStore((state) => state.login);

  return (
    <header className={'flex flex-col w-full justify-around text-center'}>
      <div className={'flex flex-row items-center w-full justify-around text-center'}>
        <Button type={'button'}>
          <Link to="/about">About Page</Link>
        </Button>
        <Button type={'button'} disabled={isAuthenticated}>
          <Link to="/login">Login page</Link>
        </Button>
        <h1 className="text-2xl font-bold text-pink-600 p-3 text-center max-[520px]:text-xl  transition-all duration-200 ease-in-out">
          Fun Chat
        </h1>
        <Button type={'button'} disabled={!isAuthenticated}>
          <Link to="/main">Chat Page</Link>
        </Button>
        <Button onClick={logout} disabled={!isAuthenticated}>
          Exit
        </Button>{' '}
      </div>
      {userName && isAuthenticated ? (
        <div className="flex flex-row items-center justify-around text-teal-900 font-bold">
          Your username: {userName}
        </div>
      ) : (
        <div>{''}</div>
      )}
    </header>
  );
}
