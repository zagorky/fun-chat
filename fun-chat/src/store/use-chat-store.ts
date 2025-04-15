import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { sendWebSocketMessage } from '../socket.ts';
import type { ServerResponse, UserType } from '../types/types.ts';

type ChatStore = {
  currentUser: string;
  users: UserType[];
  error: string | null;
  searchQuery: string;
  filteredUsers: UserType[];

  getUsers: () => void;
  setSearchQuery: (query: string) => void;
};

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set, get) => ({
        currentUser: '',
        users: [],
        error: null,
        searchQuery: '',
        filteredUsers: [],
        setSearchQuery: (query) => {
          set({
            searchQuery: query,
            filteredUsers: get().users.filter((user) =>
              user.login.toLowerCase().includes(query.toLowerCase()),
            ),
          });
        },

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
  if (data.type === 'USER_ACTIVE') {
    useChatStore.setState({
      users: data.payload.users,
    });
  } else if (data.type === 'ERROR') {
    useChatStore.setState({
      error: data.payload.error,
    });
  }
}
