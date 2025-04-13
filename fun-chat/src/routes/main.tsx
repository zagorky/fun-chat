import { Form } from '../components/form/form.tsx';
import { Header } from '../components/header/header.tsx';
import { Footer } from '../components/footer/footer.tsx';
import { Header1 } from '../components/headers/headers.tsx';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../store/use-auth-store.ts';

export default function MainPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' }).catch((error) => console.log(error));
    }
  }, [isAuthenticated, navigate]);
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
