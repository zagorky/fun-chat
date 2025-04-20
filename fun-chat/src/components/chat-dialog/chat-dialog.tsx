import { Message } from '../message/message.tsx';
import { useChatStore } from '../../stores/use-chat-store.ts';
import { useAuthStore } from '../../stores/use-auth-store.ts';
import React, { useEffect, useRef, useState } from 'react';
import type { MessageType } from '../../types/types.ts';
import { Divider } from '../divider/divider.tsx';
import { ChatForm } from '../chat-form/chat-form.tsx';

export function ChatDialog() {
  const selectedUser = useChatStore((state) => state.selectedUser?.login);
  const messages = useChatStore((state) => state.messages);
  const currentUser = useAuthStore((state) => state.login);
  const messagesEndReference = useRef<HTMLLIElement>(null);
  const dividerReference = useRef<HTMLDivElement>(null);
  const [showDivider, setShowDivider] = useState(true);
  const [lastSelectedUser, setLastSelectedUser] = useState<string | null>(null);
  const [hasViewedUnreadMessages, setHasViewedUnreadMessages] = useState(false);

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
    if (showDivider) {
      setShowDivider(false);
      setHasViewedUnreadMessages(true);
    }
  };

  useEffect(() => {
    if (selectedUser && selectedUser !== lastSelectedUser) {
      setShowDivider(true);
      setLastSelectedUser(selectedUser);
      setHasViewedUnreadMessages(false);
    }
  }, [selectedUser, lastSelectedUser]);

  useEffect(() => {
    if (hasViewedUnreadMessages) {
      setShowDivider(false);
    } else {
      setShowDivider(true);
    }
  }, [hasViewedUnreadMessages]);

  useEffect(() => {
    if (filteredMessages.length === 0) return;

    if (showDivider) {
      dividerReference.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      messagesEndReference.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [filteredMessages, showDivider]);

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
          {isFirstUnread && showDivider && <Divider ref={dividerReference} />}
          <Message {...message} />
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {' '}
      <ul className="mt-2 pr-2 space-y-1 overflow-y-auto max-h-[calc(70vh-100px)] flex-grow">
        {renderMessages()}
        <li ref={messagesEndReference}></li>
      </ul>
      <ChatForm
        onClick={() => {
          handleReadMessages(filteredMessages);
          handleUserInteraction();
        }}
      />
    </>
  );
}
