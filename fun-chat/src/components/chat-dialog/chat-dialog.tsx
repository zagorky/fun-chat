import { Message } from '../message/message.tsx';
import { useChatStore } from '../../stores/use-chat-store.ts';
import { useAuthStore } from '../../stores/use-auth-store.ts';
import { useEffect, useRef } from 'react';
import type { MessageType } from '../../types/types.ts';

export function ChatDialog() {
  const selectedUser = useChatStore((state) => state.selectedUser?.login);
  const messages = useChatStore((state) => state.messages);
  const currentUser = useAuthStore((state) => state.login);
  const messagesEndReference = useRef<HTMLLIElement>(null);

  const filteredMessages = messages.filter(
    (message) =>
      (message.from === currentUser && message.to === selectedUser) ||
      (message.from === selectedUser && message.to === currentUser),
  );

  const handleReadMessages = (messages: MessageType[]) => {
    if (!selectedUser) return;
    messages.forEach((message) => {
      if (message.to === currentUser && !message.status.isReaded) {
        useChatStore.getState().markAsRead(message.id, currentUser, selectedUser);
      }
    });
  };

  useEffect(() => {
    messagesEndReference.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages]);

  const renderMessages = () => {
    if (!selectedUser) {
      return <li>Select a user to start chatting</li>;
    }

    if (filteredMessages.length === 0) {
      return <li>No message history</li>;
    }

    return filteredMessages.map((message) => (
      <Message
        key={message.id}
        id={message.id}
        to={message.to}
        from={message.from}
        text={message.text}
        datetime={message.datetime}
        status={message.status}
      />
    ));
  };

  return (
    <ul
      className="mt-2 pr-2 space-y-1 overflow-y-auto max-h-[calc(70vh-100px)] flex-grow"
      onClick={() => handleReadMessages(filteredMessages)}
    >
      {renderMessages()}
      <li ref={messagesEndReference}></li>
    </ul>
  );
}
