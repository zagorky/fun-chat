import { hasSome } from '@powwow-js/core';
import type { ClientRequest, ServerResponse } from './types/types.ts';
import { isMessage } from './types/helpers.ts';

let socket: WebSocket | null = null;
const messageHandlers: ((data: ServerResponse) => void)[] = [];

export function connectSocket(url: string) {
  socket = new WebSocket(url);

  socket.addEventListener('message', (event: MessageEvent) => {
    try {
      if (typeof event.data !== 'string') {
        console.error('Unsupported message type:', typeof event.data);
        return;
      }
      const data: unknown = JSON.parse(event.data);
      console.log('Received message', data);
      if (isMessage<ServerResponse>(data)) {
        if (data.type === 'ERROR') {
          console.error('Server Error:', data.payload.error);
        } else {
          messageHandlers.forEach((handler) => handler(data));
        }
      }
    } catch (error) {
      console.error('Invalid message format', error);
    }
  });

  socket.addEventListener('close', () => {
    const delay = 3000;
    setTimeout(() => connectSocket(url), delay);
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
