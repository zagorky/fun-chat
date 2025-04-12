import { Link } from '@tanstack/react-router';

export function Footer() {
  const style = ['flex', 'items-center', 'w-full', 'justify-between', 'p-4'];
  return (
    <footer className={[...style].join(' ')}>
      <p>RS School</p>
      <p>2025</p>
      <Link to={'https://github.com/zagorky'}>Zagorky</Link>
    </footer>
  );
}
