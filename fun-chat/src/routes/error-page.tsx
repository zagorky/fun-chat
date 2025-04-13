import { Footer } from '../components/footer/footer.tsx';
import { Header } from '../components/header/header.tsx';

export function ErrorPage() {
  return (
    <main>
      <Header />
      <h1 className="text-2xl font-bold text-pink-600 p-3 text-center">Error Page</h1>
      <p>Page Not Found</p>
      <Footer />
    </main>
  );
}
