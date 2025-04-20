import { Message } from '../message/message.tsx';
import { useChatStore } from '../../stores/use-chat-store.ts';
import { useAuthStore } from '../../stores/use-auth-store.ts';
import React, { useEffect, useRef, useState } from 'react';
import type { MessageType } from '../../types/types.ts';
import { Divider } from '../divider/divider.tsx';

export function ChatDialog() {
  const selectedUser = useChatStore((state) => state.selectedUser?.login);
  const messages = useChatStore((state) => state.messages);
  const currentUser = useAuthStore((state) => state.login);
  const messagesEndReference = useRef<HTMLLIElement>(null);
  const [showDivider, setShowDivider] = useState(true);

  const filteredMessages = messages.filter(
    (message) =>
      (message.from === currentUser && message.to === selectedUser) ||
      (message.from === selectedUser && message.to === currentUser),
  );

  const firstUnreadMessage = filteredMessages.find(
    (message) => message.to === currentUser && !message.status.isReaded,
  );

  const handleReadMessages = (messages: MessageType[]) => {
    if (!selectedUser) return;
    messages.forEach((message) => {
      if (message.to === currentUser && !message.status.isReaded) {
        useChatStore.getState().markAsRead(message.id, currentUser, selectedUser);
      }
    });
  };

  const handleUserInteraction = () => {
    if (showDivider) setShowDivider(false);
  };

  useEffect(() => {
    if (selectedUser && firstUnreadMessage) {
      setShowDivider(true);
    }
  }, [selectedUser, firstUnreadMessage]);

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

    return filteredMessages.map((message) => {
      const isFirstUnread = firstUnreadMessage?.id === message.id;
      return (
        <React.Fragment key={message.id}>
          {isFirstUnread && showDivider && <Divider />}
          <Message {...message} />
        </React.Fragment>
      );
    });
  };

  return (
    <ul
      className="mt-2 pr-2 space-y-1 overflow-y-auto max-h-[calc(70vh-100px)] flex-grow"
      onClick={() => {
        handleReadMessages(filteredMessages);
        handleUserInteraction();
      }}
    >
      {renderMessages()}
      <li ref={messagesEndReference}></li>
    </ul>
  );
}
