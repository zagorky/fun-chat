import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className={'flex items-center w-full justify-between p-4 absolute z-20 bottom-0'}>
      <p>RS School</p>
      <p>2025</p>
      <Link to={'https://github.com/zagorky'}>Zagorky</Link>
    </footer>
  );
}
