import { Button } from '../button/button.tsx';
import { Header1 } from '../headers/headers.tsx';
import { Link } from '@tanstack/react-router';

export function Header() {
  const style = ['flex', 'items-center', 'w-full', 'justify-between', 'p-4'];
  return (
    <header className={[...style].join(' ')}>
      <Button type={'button'}>
        <Link to="/about">About Page</Link>
      </Button>
      <Button type={'button'}>
        <Link to="/login">Login page</Link>
      </Button>
      <Header1 title={'Popik Chat'} />

      <Button type={'button'}>
        <Link to="/main">Chat Page</Link>
      </Button>
      <Button
        onClick={() => {
          console.log(' Header heh');
        }}
      >
        Exit
      </Button>
    </header>
  );
}
