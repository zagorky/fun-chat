import { ReactNode } from 'react';

type LinkProps = { url: string; children: string | ReactNode; onClick: () => void };

export function Link(props: LinkProps) {
  const { url, children, onClick } = props;
  return (
    <a href={url} onClick={() => onClick}>
      {children}
    </a>
  );
}
