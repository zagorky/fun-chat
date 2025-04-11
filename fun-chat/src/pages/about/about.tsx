import { Header } from '../../components/header/header.tsx';
import { Footer } from '../../components/footer/footer.tsx';
import { Header1 } from '../../components/headers/headers.tsx';

export function AboutPage() {
  return (
    <main>
      <Header />
      <Header1 title={'About Page'} />
      <Footer />
    </main>
  );
}
