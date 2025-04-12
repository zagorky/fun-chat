import { Header } from '../components/header/header.tsx';
import { Header1 } from '../components/headers/headers.tsx';
import { Footer } from '../components/footer/footer.tsx';

export default function AboutPage() {
  return (
    <main className={'flex flex-col items-center justify-center'}>
      <Header />
      <Header1 title={'About Page'} />
      <Footer />
    </main>
  );
}
