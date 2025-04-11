import { Form } from '../../components/form/form.tsx';
import { Header } from '../../components/header/header.tsx';
import { Footer } from '../../components/footer/footer.tsx';
import { Header2 } from '../../components/headers/headers.tsx';

export function MainPage() {
  return (
    <>
      <Header />
      <main>
        <Header2 title={'Chat Page'} />
        <Form />
      </main>
      <Footer />
    </>
  );
}
