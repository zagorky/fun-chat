import { Button } from '../button/button.tsx';
import { Link } from '@tanstack/react-router';
import { useAuthStore } from '../../store/use-auth-store.ts';

export function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const style = ['flex', 'items-center', 'w-full', 'justify-between', 'p-4'];
  return (
    <header className={[...style].join(' ')}>
      <Button type={'button'}>
        <Link to="/about">About Page</Link>
      </Button>
      <Button type={'button'} disabled={isAuthenticated}>
        <Link to="/login">Login page</Link>
      </Button>
      <h1 className="text-2xl font-bold text-pink-600 p-3 text-center">Popik Chat</h1>
      <Button type={'button'} disabled={!isAuthenticated}>
        <Link to="/main">Chat Page</Link>
      </Button>
      <Button onClick={logout} disabled={!isAuthenticated}>
        Exit
      </Button>
    </header>
  );
}
