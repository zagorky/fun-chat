import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { MessageType, ServerMessage, UserType } from '../types/types.ts';
import { useAuthStore } from './use-auth-store.ts';
import {
  sendDeleteMessageToServer,
  sendEditMessageToServer,
  sendMessageToServer,
  sendReadMessageToServer,
} from '../api/utils/send-message.ts';
import { getUserHistory, getUsersHistory, getUsersUtility } from '../api/utils/get-users.ts';

type ChatStore = {
  users: UserType[];
  activeUsers: UserType[];
  selectedUser: UserType | null;
  messages: MessageType[];
  error: string | null;
  getUsers: () => void;
  setSelectedUser: (user: UserType) => void;
  sendMessage: (currentUser: string, message: string) => void;
  markAsRead: (messageId: string, userLogin: string, selectedUser: string) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (messageId: string, text: string) => void;
  updateMessageStatus: (messageId: string, status: Partial<MessageType['status']>) => void;
};

export const useChatStore = create<ChatStore>()(
  devtools((set, get) => ({
    users: [],
    activeUsers: [],
    selectedUser: null,
    messages: [],
    error: null,
    getUsers: () => getUsersUtility(),
    setSelectedUser: (user) => {
      getUserHistory(user);
      set({ selectedUser: user });
    },
    sendMessage: (currentUser, message) => {
      const state = get();
      if (!state.selectedUser) return;
      sendMessageToServer(currentUser, state.selectedUser.login, message);
    },
    markAsRead: (messageId, userLogin, selectedUser) => {
      set((state) => ({
        messages: state.messages.map((message) =>
          message.to === userLogin && message.from === selectedUser && !message.status.isReaded
            ? { ...message, status: { ...message.status, isReaded: true } }
            : message,
        ),
      }));
      sendReadMessageToServer(messageId);
    },
    deleteMessage: (messageId) => {
      const state = get();

      if (!state.messages.some((m) => m.id === messageId)) {
        return;
      }
      set({
        messages: state.messages.filter((message) => message.id !== messageId),
      });

      sendDeleteMessageToServer(messageId);
    },
    editMessage: (messageId, text) => {
      set((state) => ({
        messages: state.messages.map((message) =>
          message.id === messageId
            ? {
                ...message,
                text,
                status: { ...message.status, isEdited: true },
              }
            : message,
        ),
      }));
      sendEditMessageToServer(messageId, text);
    },
    updateMessageStatus: (messageId: string, status: Partial<MessageType['status']>) => {
      set((state) => ({
        messages: state.messages.map((message) =>
          message.id === messageId
            ? { ...message, status: { ...message.status, ...status } }
            : message,
        ),
      }));
    },
  })),
);

export function handleServerMessageForChat(data: ServerMessage) {
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

        getUsersHistory(users);
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
        const activeUsers = [...state.activeUsers, updatedUser];
        const users = state.users.map((u) => (u.login === updatedUser.login ? updatedUser : u));

        return {
          activeUsers,
          users,
        };
      });
      break;
    }
    case 'USER_EXTERNAL_LOGIN': {
      useChatStore.setState((state) => {
        const updatedUser = data.payload.user;
        const activeUsers = state.activeUsers.filter((u) => u.login !== updatedUser.login);
        const users = state.users.map((u) => (u.login === updatedUser.login ? updatedUser : u));

        return {
          activeUsers,
          users,
          messages: state.messages.map((message) =>
            message.to === updatedUser.login && !message.status.isDelivered
              ? { ...message, status: { ...message.status, isDelivered: true } }
              : message,
          ),
        };
      });
      break;
    }
    case 'MSG_FROM_USER': {
      useChatStore.setState((state) => ({
        messages: [
          ...state.messages,
          ...data.payload.messages.filter(
            (newMessage) =>
              !state.messages.some((existingMessage) => existingMessage.id === newMessage.id),
          ),
        ].sort((a, b) => a.datetime - b.datetime),
      }));
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
            message_.text === message.text && !message_.status.isDelivered ? message : message_,
          ),
        }));
      }
      break;
    }
    case 'MSG_DELIVER': {
      useChatStore.getState().updateMessageStatus(data.payload.message.id, { isDelivered: true });
      break;
    }
    case 'MSG_DELETE': {
      useChatStore.setState((state) => ({
        messages: state.messages.filter((m) => m.id !== data.payload.message.id),
      }));
      break;
    }
    case 'MSG_READ': {
      useChatStore.getState().updateMessageStatus(data.payload.message.id, { isReaded: true });
      break;
    }
    case 'MSG_EDIT': {
      const { id, text } = data.payload.message;
      useChatStore.setState((state) => ({
        messages: state.messages.map((m) =>
          m.id === id ? { ...m, text, status: { ...m.status, isEdited: true } } : m,
        ),
      }));
      break;
    }
  }
}
