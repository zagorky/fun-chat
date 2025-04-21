import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { handleServerMessageForAuth, useAuthStore } from '../stores/use-auth-store.ts';
import { UserList } from '../components/user-list/user-list.tsx';
import { Chat } from '../components/chat/chat.tsx';
import { subscribeToMessages } from '../api/socket.ts';
import { handleServerMessageForChat, useChatStore } from '../stores/use-chat-store.ts';
import { Layout } from '../components/layout/layout.tsx';
import type { ServerMessage } from '../types/types.ts';

export default function MainPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' }).catch((error) => console.log(error));
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleServerMessage = (message: ServerMessage) => {
      handleServerMessageForAuth(message);
      handleServerMessageForChat(message);
      if (message.type === 'USER_EXTERNAL_LOGIN' || message.type === 'USER_EXTERNAL_LOGOUT') {
        useChatStore.getState().getUsers();
      }
    };

    const cleanup = subscribeToMessages(handleServerMessage);

    return () => {
      cleanup();
    };
  }, []);

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center">
        <div className=" max-w-[700px] grid grid-cols-2 max-[750px]:grid-cols-1 max-[750px]:max-w-[320px]">
          <UserList />
          <Chat />
        </div>
      </main>
    </Layout>
  );
}
