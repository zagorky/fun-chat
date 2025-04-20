import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className="flex items-center w-full justify-around p-4 absolute z-20 bottom-0">
      <p>2025</p>
      <img src={'/rss-logo.png'} alt="RS School logo" className="h-8 w-auto max-[750px]:h-6"></img>
      <Link to={'https://github.com/zagorky'} target="_blank" rel="noopener noreferrer">
        Zagorky
      </Link>
    </footer>
  );
}
