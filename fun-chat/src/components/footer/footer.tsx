import { Link } from '../link/link.tsx';

export function Footer() {
  const style = ['flex', 'items-center', 'w-full', 'justify-between', 'p-4'];
  return (
    <footer className={[...style].join(' ')}>
      <p>RS School</p>
      <Link
        url={'https://github.com/zagorky'}
        onClick={() => {
          console.log('Footer heh');
        }}
      >
        Zagorky
      </Link>
      <p>2025</p>
    </footer>
  );
}
