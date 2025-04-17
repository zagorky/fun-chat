import { sendWebSocketMessage } from '../socket.ts';
import { useChatStore } from '../stores/use-chat-store.ts';
import type { UserType } from '../types/types.ts';

export function setSelectedUserUtility(user: UserType) {
  useChatStore.setState({ selectedUser: user });

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
