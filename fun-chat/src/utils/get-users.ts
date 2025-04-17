import { sendWebSocketMessage } from '../socket.ts';
import { useChatStore } from '../stores/use-chat-store.ts';

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
