import type { MessageType } from '../../types/types.ts';
import { sendWebSocketMessage } from '../socket.ts';
import { useChatStore } from '../../stores/use-chat-store.ts';

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

export function sendDeleteMessageToServer(messageId: string) {
  sendWebSocketMessage({
    id: crypto.randomUUID(),
    type: 'MSG_DELETE',
    payload: {
      message: {
        id: messageId,
      },
    },
  });
}

export function sendEditMessageToServer(messageId: string, newText: string) {
  sendWebSocketMessage({
    id: crypto.randomUUID(),
    type: 'MSG_EDIT',
    payload: {
      message: {
        id: messageId,
        text: newText,
        status: {
          isEdited: true,
        },
      },
    },
  });
}

export function sendReadMessageToServer(messageId: string) {
  sendWebSocketMessage({
    id: crypto.randomUUID(),
    type: 'MSG_READ',
    payload: {
      message: {
        id: messageId,
        status: {
          isReaded: true,
        },
      },
    },
  });
}
