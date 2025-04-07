import { Link } from '../link/link.tsx';

export function Footer() {
  return (
    <footer>
      <p>RS School</p>
      <Link url={'https://github.com/zagorky'} onClick={() => {}}>
        Zagorky
      </Link>
      <p>2025</p>
    </footer>
  );
}
