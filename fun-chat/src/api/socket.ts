import type { ClientRequest, ServerMessage } from '../types/types.ts';
import { isMessage } from '../types/helpers.ts';
import { useAuthStore } from '../stores/use-auth-store.ts';
import { hasSome } from '@powwow-js/core';
import { sendLoginMessage } from './utils/authorization.ts';

let socket: WebSocket | null = null;
const messageHandlers: ((data: ServerMessage) => void)[] = [];
const RECONNECT_INTERVAL = 3000;

export function connectSocket(url: string) {
  const { setConnecting } = useAuthStore.getState();

  if (
    socket &&
    (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)
  )
    return;

  setConnecting(true);

  if (socket) {
    socket.close();
  }

  socket = new WebSocket(url);
  console.log('Connecting WebSocket');

  socket.addEventListener('open', onOpen);

  socket.addEventListener('message', onMessage);

  socket.addEventListener('close', () => onClose(url));

  socket.addEventListener('error', onError);
}

export function sendWebSocketMessage(message: ClientRequest | ServerMessage) {
  if (hasSome(socket) && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}

export function subscribeToMessages(handler: (data: ServerMessage) => void) {
  messageHandlers.push(handler);
  return () => {
    const index = messageHandlers.indexOf(handler);
    if (index !== -1) {
      messageHandlers.splice(index, 1);
    }
  };
}

export function disconnectSocket() {
  socket?.close();
  socket = null;
}

const onOpen = () => {
  const { setConnecting, login, password, setReconnecting } = useAuthStore.getState();

  console.log('WebSocket connected');

  setReconnecting(false);
  setConnecting(false);

  if (login && password) {
    sendLoginMessage(login, password);
  }
};

const onMessage = (event: MessageEvent) => {
  try {
    if (typeof event.data !== 'string') {
      console.error('Unsupported message type:', typeof event.data);
      return;
    }
    const data: unknown = JSON.parse(event.data);

    if (isMessage<ServerMessage>(data)) {
      messageHandlers.forEach((handler) => handler(data));
    }
  } catch (error) {
    console.error('Invalid message format', error);
  }
};

const onClose = (url: string) => {
  const { setConnecting, setReconnecting } = useAuthStore.getState();

  console.log(`WebSocket closed`);
  setConnecting(false);
  setReconnecting(true);

  setTimeout(() => connectSocket(url), RECONNECT_INTERVAL);
};

const onError = () => {
  const { setConnecting } = useAuthStore.getState();
  setConnecting(false);
  socket?.close();
};
