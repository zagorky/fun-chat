import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { handleServerMessageForAuth, useAuthStore } from '../store/use-auth-store.ts';
import { UserList } from '../components/user-list/user-list.tsx';
import { Chat } from '../components/chat/chat.tsx';
import { subscribeToMessages } from '../socket.ts';
import { handleServerMassageForChat } from '../store/use-chat-store.ts';
import { Layout } from '../components/layout/layout.tsx';

export default function MainPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' }).catch((error) => console.log(error));
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const cleanupAuth = subscribeToMessages(handleServerMessageForAuth);
    const cleanupChat = subscribeToMessages(handleServerMassageForChat);
    return () => {
      cleanupAuth();
      cleanupChat();
    };
  }, []);

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 max-[750px]:grid-cols-1">
          <UserList />
          <Chat />
        </div>
      </main>
    </Layout>
  );
}
