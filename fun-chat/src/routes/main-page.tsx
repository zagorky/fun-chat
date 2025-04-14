import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../store/use-auth-store.ts';
import { UserList } from '../components/user-list/user-list.tsx';
import { Chat } from '../components/chat/chat.tsx';
import { Footer } from '../components/footer/footer.tsx';
import { Header } from '../components/header/header.tsx';

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
        <h1 className="text-2xl font-bold text-pink-600 p-3 text-center max-[520px]:text-xl  transition-all duration-200 ease-in-out">
          Chat Page
        </h1>
        <UserList />
        <Chat />
      </main>
      <Footer />
    </>
  );
}
