import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { sendWebSocketMessage } from '../socket.ts';
import type { ServerResponse, UserType } from '../types/types.ts';

type ChatStore = {
  users: UserType[];
  error: string | null;
  searchQuery: string;
  getUsers: () => void;
};

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set) => ({
        users: [],
        error: null,
        searchQuery: '',
        getUsers: () => {
          set({ error: null });
          sendWebSocketMessage({
            id: crypto.randomUUID(),
            type: 'USER_ACTIVE',
            payload: null,
          });
        },
      }),
      {
        name: 'ChatStore',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export function handleServerMassageForChat(data: ServerResponse) {
  switch (data.type) {
    case 'USER_ACTIVE': {
      useChatStore.setState({
        users: data.payload.users,
      });

      break;
    }
    case 'ERROR': {
      useChatStore.setState({
        error: data.payload.error,
      });

      break;
    }
    case 'USER_EXTERNAL_LOGOUT': {
      useChatStore.setState({
        users: [...useChatStore.getState().users].filter(
          (user) => user.login !== data.payload.user.login,
        ),
      });
      break;
    }
    case 'USER_EXTERNAL_LOGIN': {
      useChatStore.setState({
        users: [...useChatStore.getState().users, data.payload.user],
      });
      break;
    }
  }
}
