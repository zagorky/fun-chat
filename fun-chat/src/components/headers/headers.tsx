type HeaderProps = {
  title: string;
};

export function Header1(props: HeaderProps) {
  const { title } = props;
  const style = ['text-2xl', 'font-bold', 'text-pink-600', 'p-3', 'text-center'];
  return <h1 className={[...style].join(' ')}>{title}</h1>;
}

export function Header2(props: HeaderProps) {
  const { title } = props;
  const style = ['text-xl', 'font-bold', 'text-pink-800', 'p-3', 'text-center'];

  return <h2 className={[...style].join(' ')}>{title}</h2>;
}
