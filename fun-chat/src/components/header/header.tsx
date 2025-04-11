import { Button } from '../button/button.tsx';
import { Header1 } from '../headers/headers.tsx';

export function Header() {
  const style = ['flex', 'items-center', 'w-full', 'justify-between', 'p-4'];
  return (
    <header className={[...style].join(' ')}>
      <Header1 title={'Popik Chat'} />
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
