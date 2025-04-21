import { Button } from '../button/button.tsx';
import { Link } from '@tanstack/react-router';
import { useAuthStore } from '../../stores/use-auth-store.ts';
import { handleLogout } from '../../api/utils/authorization.ts';

export function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userName = useAuthStore((state) => state.login);

  return (
    <header className={'flex flex-col w-full justify-around text-center'}>
      <div className={'flex flex-row items-center w-full justify-around text-center'}>
        <Link to={'/about'}>
          <Button type={'button'}>About Page</Button>{' '}
        </Link>
        <Link
          className={isAuthenticated ? 'pointer-events-none' : ''}
          to={isAuthenticated ? '/main' : '/login'}
        >
          <Button type={'button'} disabled={isAuthenticated}>
            Login page
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-pink-600 p-3 text-center max-[750px]:text-[14px]  transition-all duration-200 ease-in-out">
          Naive Chat
        </h1>
        <Link
          to={isAuthenticated ? '/main' : '/'}
          className={isAuthenticated ? '' : 'pointer-events-none'}
        >
          <Button type={'button'} disabled={!isAuthenticated}>
            Chat Page
          </Button>
        </Link>
        <Button onClick={handleLogout} disabled={!isAuthenticated}>
          Exit
        </Button>{' '}
      </div>
      {userName && isAuthenticated ? (
        <h2 className="flex flex-row items-center justify-around text-teal-900 font-bold">
          Your username: {userName}
        </h2>
      ) : (
        <div>{''}</div>
      )}
    </header>
  );
}
