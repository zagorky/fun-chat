import { Form } from '../components/form/form.tsx';
import { Header } from '../components/header/header.tsx';
import { Footer } from '../components/footer/footer.tsx';
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
        <h1 className="text-2xl font-bold text-pink-600 p-3 text-center">Chat Page</h1>
        <Form />
      </main>
      <Footer />
    </>
  );
}
