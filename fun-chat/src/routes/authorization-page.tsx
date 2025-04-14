import { useEffect } from 'react';
import { AuthorizationForm } from '../components/authorization-form/authorization-form.tsx';
import { Header } from '../components/header/header.tsx';
import { Footer } from '../components/footer/footer.tsx';
import { useNavigate } from '@tanstack/react-router';
import { handleServerMessage, useAuthStore } from '../store/use-auth-store.ts';
import { subscribeToMessages } from '../socket.ts';

export default function AuthorizationPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Redirect to main page');
      navigate({ to: '/main' }).catch((error) => console.log(error));
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const cleanup = subscribeToMessages(handleServerMessage);
    return () => cleanup();
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1 className="text-2xl font-bold text-pink-600 p-3 text-center max-[520px]:text-xl  transition-all duration-200 ease-in-out">
          Authorization Page
        </h1>
        <AuthorizationForm />
      </main>
      <Footer />
    </>
  );
}
