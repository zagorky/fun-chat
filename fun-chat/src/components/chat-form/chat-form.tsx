import { Input } from '../input/input.tsx';
import React, { useState } from 'react';
import { Button } from '../button/button.tsx';
import { useChatStore } from '../../stores/use-chat-store.ts';
import { useAuthStore } from '../../stores/use-auth-store.ts';

type ChatFormProps = {
  onClick: () => void;
};

export function ChatForm({ onClick }: ChatFormProps) {
  const [message, setMessage] = useState('');
  const selectedUser = useChatStore((state) => state.selectedUser);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const currentUser = useAuthStore((state) => state.login);

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.length > 0 && selectedUser && currentUser) {
      sendMessage(currentUser, message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <Input
        id={'chat-input'}
        label={''}
        type={'text'}
        value={message}
        disabled={!selectedUser}
        onChange={(event) => setMessage(event.target.value)}
        onClick={() => onClick()}
      />
      <Button type={'submit'} disabled={!selectedUser || message.length === 0}>
        Send
      </Button>
    </form>
  );
}
