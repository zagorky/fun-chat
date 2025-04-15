import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { sendWebSocketMessage } from '../socket.ts';
import type { MessageType, ServerResponse, UserType } from '../types/types.ts';

type ChatStore = {
  users: UserType[];
  activeUsers: UserType[];
  selectedUser: UserType | null;
  messages: MessageType[];
  error: string | null;
  searchQuery: string;
  getUsers: () => void;
  setSelectedUser: (user: UserType) => void;
};

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set) => ({
        users: [],
        activeUsers: [],
        error: null,
        searchQuery: '',
        selectedUser: null,
        messages: [],
        getUsers: () => {
          set({ error: null });

          sendWebSocketMessage({
            id: crypto.randomUUID(),
            type: 'USER_ACTIVE',
            payload: null,
          });

          sendWebSocketMessage({
            id: crypto.randomUUID(),
            type: 'USER_INACTIVE',
            payload: null,
          });
        },
        setSelectedUser: (user) => {
          set({ selectedUser: user });

          sendWebSocketMessage({
            id: crypto.randomUUID(),
            type: 'MSG_FROM_USER',
            payload: {
              user: {
                login: user.login,
              },
            },
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
      useChatStore.setState((state) => {
        const activeUsers = data.payload.users;

        const users = [
          ...activeUsers,
          ...state.users.filter((u) => !activeUsers.some((au) => au.login === u.login)),
        ];

        return { activeUsers, users };
      });
      break;
    }
    case 'USER_INACTIVE': {
      useChatStore.setState((state) => {
        const inactiveUsers = data.payload.users;

        const users = [
          ...state.activeUsers,
          ...inactiveUsers.filter((u) => !state.activeUsers.some((au) => au.login === u.login)),
        ];

        return { users };
      });
      break;
    }
    case 'ERROR': {
      useChatStore.setState({ error: data.payload.error });

      break;
    }
    case 'USER_EXTERNAL_LOGOUT': {
      useChatStore.setState((state) => {
        const updatedUser = data.payload.user;

        return {
          activeUsers: [...state.activeUsers, updatedUser],
          users: state.users.some((u) => u.login === updatedUser.login)
            ? state.users.map((u) => (u.login === updatedUser.login ? updatedUser : u))
            : [...state.users, updatedUser],
        };
      });
      break;
    }
    case 'USER_EXTERNAL_LOGIN': {
      useChatStore.setState((state) => {
        const updatedUser = data.payload.user;

        return {
          activeUsers: state.activeUsers.filter((u) => u.login !== updatedUser.login),
          users: state.users.map((u) => (u.login === updatedUser.login ? updatedUser : u)),
        };
      });
      break;
    }
    case 'MSG_FROM_USER': {
      useChatStore.setState({ messages: data.payload.messages });
      break;
    }
  }
}
