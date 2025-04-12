import { Form } from '../components/form/form.tsx';
import { Header } from '../components/header/header.tsx';
import { Footer } from '../components/footer/footer.tsx';
import { Header1 } from '../components/headers/headers.tsx';

export default function MainPage() {
  return (
    <>
      <Header />
      <main className={'flex flex-col items-center justify-center'}>
        <Header1 title={'Chat Page'} />
        <Form />
      </main>
      <Footer />
    </>
  );
}
