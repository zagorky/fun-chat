import { sendWebSocketMessage } from '../socket.ts';
import { useChatStore } from '../../stores/use-chat-store.ts';
import { useAuthStore } from '../../stores/use-auth-store.ts';
import type { UserType } from '../../types/types.ts';

export function getUsersUtility() {
  useChatStore.setState({ error: null });

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
}

export function getUsersHistory(users: UserType[]) {
  users.forEach((user) => getUserHistory(user));
}

export function getUserHistory(user: UserType) {
  if (user.login !== useAuthStore.getState().login) {
    sendWebSocketMessage({
      id: crypto.randomUUID(),
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login: user.login,
        },
      },
    });
  }
}
