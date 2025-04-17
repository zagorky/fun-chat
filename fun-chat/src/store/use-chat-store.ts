import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { sendWebSocketMessage } from '../socket.ts';
import type { MessageType, ServerResponse, UserType } from '../types/types.ts';
import { useAuthStore } from './use-auth-store.ts';

type ChatStore = {
  users: UserType[];
  activeUsers: UserType[];
  selectedUser: UserType | null;
  messages: MessageType[];
  error: string | null;
  searchQuery: string;
  getUsers: () => void;
  setSelectedUser: (user: UserType) => void;
  sendMessage: (currentUser: string, message: string) => void;
};

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set, get) => ({
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
        sendMessage: (currentUser, message) => {
          const state = get();

          if (!state.selectedUser) return;

          const newMessage: MessageType = {
            id: crypto.randomUUID(),
            from: currentUser,
            to: state.selectedUser.login,
            text: message,
            datetime: Date.now(),
            status: {
              isDelivered: false,
              isReaded: false,
              isEdited: false,
            },
          };

          sendWebSocketMessage({
            id: crypto.randomUUID(),
            type: 'MSG_SEND',
            payload: {
              message: {
                to: state.selectedUser.login,
                text: message,
              },
            },
          });

          set({
            messages: [...state.messages, newMessage].sort((a, b) => a.datetime - b.datetime),
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
    case 'USER_LOGOUT': {
      useChatStore.setState({ selectedUser: null });
      break;
    }
    case 'MSG_SEND': {
      const message = data.payload.message;
      const isIncomingMessage = message.from !== useAuthStore.getState().login;

      if (isIncomingMessage) {
        useChatStore.setState((state) => ({
          messages: [...state.messages, message].sort((a, b) => a.datetime - b.datetime),
        }));
      } else {
        useChatStore.setState((state) => ({
          messages: state.messages.map((message_) =>
            message_.text === message.text && message_.status.isDelivered === false
              ? message
              : message_,
          ),
        }));
      }
      useChatStore.setState((state) => ({
        messages: [...state.messages, message].sort((a, b) => a.datetime - b.datetime),
      }));
      break;
    }
  }
}
