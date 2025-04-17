import type { MessageType } from '../types/types.ts';
import { sendWebSocketMessage } from '../socket.ts';
import { useChatStore } from '../stores/use-chat-store.ts';

export function sendMessageToServer(from: string, to: string, message: string) {
  const newMessage: MessageType = {
    id: crypto.randomUUID(),
    from: from,
    to: to,
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
        to,
        text: message,
      },
    },
  });

  useChatStore.setState((state) => ({
    messages: [...state.messages, newMessage].sort((a, b) => a.datetime - b.datetime),
  }));
}
