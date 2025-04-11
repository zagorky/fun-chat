import { Footer } from '../../components/footer/footer.tsx';
import { Header2 } from '../../components/headers/headers.tsx';

export function ErrorPage() {
  return (
    <main>
      <Header2 title={'Error Page'} />
      <p>Page Not Found</p>
      <Footer />
    </main>
  );
}
