import { hasSome } from '@powwow-js/core';
import type { ClientRequest, ServerResponse } from './types/types.ts';
import { isMessage } from './types/helpers.ts';
import { useAuthStore } from './stores/use-auth-store.ts';

let socket: WebSocket | null = null;
const messageHandlers: ((data: ServerResponse) => void)[] = [];
const RECONNECT_INTERVAL = 3000;

export function connectSocket(url: string) {
  const { isAuthenticated, login, password, setReconnecting } = useAuthStore.getState();

  socket = new WebSocket(url);
  console.log('Connecting WebSocket');

  socket.addEventListener('open', () => {
    console.log('WebSocket connected');

    setReconnecting(false);

    if (!isAuthenticated && login && password) {
      sendWebSocketMessage({
        id: crypto.randomUUID(),
        type: 'USER_LOGIN',
        payload: { user: { login, password } },
      });
    }
  });

  socket.addEventListener('message', (event: MessageEvent) => {
    try {
      if (typeof event.data !== 'string') {
        console.error('Unsupported message type:', typeof event.data);
        return;
      }
      const data: unknown = JSON.parse(event.data);

      if (isMessage<ServerResponse>(data)) {
        console.log('Received message', data.type, data.payload);
        messageHandlers.forEach((handler) => handler(data));
      }
    } catch (error) {
      console.error('Invalid message format', error);
    }
  });

  socket.addEventListener('close', (event) => {
    console.log(`WebSocket closed: ${event.reason}`);

    setReconnecting(true);

    setTimeout(() => connectSocket(url), RECONNECT_INTERVAL);
  });

  socket.addEventListener('error', (event) => {
    console.warn('WebSocket error', event);
    socket?.close();
  });
}

export function sendWebSocketMessage(message: ClientRequest | ServerResponse) {
  if (hasSome(socket) && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}

export function subscribeToMessages(handler: (data: ServerResponse) => void) {
  messageHandlers.push(handler);
  return () => {
    const index = messageHandlers.indexOf(handler);
    if (index !== -1) {
      messageHandlers.splice(index, 1);
    }
  };
}
