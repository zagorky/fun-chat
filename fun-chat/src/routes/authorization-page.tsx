import { useEffect } from 'react';
import { AuthorizationForm } from '../components/authorization-form/authorization-form.tsx';
import { useNavigate } from '@tanstack/react-router';
import { handleServerMessageForAuth, useAuthStore } from '../stores/use-auth-store.ts';
import { subscribeToMessages } from '../api/socket.ts';
import { Layout } from '../components/layout/layout.tsx';

export default function AuthorizationPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/main' }).catch((error) => console.log(error));
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const cleanup = subscribeToMessages(handleServerMessageForAuth);
    return () => {
      cleanup();
    };
  }, []);

  return (
    <Layout>
      <main>
        <h1 className="text-2xl font-bold text-pink-600 p-3 text-center max-[520px]:text-xl  transition-all duration-200 ease-in-out">
          Authorization Page
        </h1>
        <AuthorizationForm />
      </main>
    </Layout>
  );
}
