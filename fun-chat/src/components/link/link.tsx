import type { ReactNode } from 'react';

type LinkProps = { url: string; children: string | ReactNode; onClick: () => void };

export function Link(props: LinkProps) {
  const { url, children, onClick } = props;
  const style = ['hover:text-pink-500', 'hover:underline', 'p-1', 'm-2'];
  return (
    <a className={[...style].join(' ')} href={url} onClick={() => onClick}>
      {children}
    </a>
  );
}
