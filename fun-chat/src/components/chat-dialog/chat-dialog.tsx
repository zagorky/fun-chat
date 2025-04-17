import { Message } from '../message/message.tsx';
import { useChatStore } from '../../stores/use-chat-store.ts';
import { useAuthStore } from '../../stores/use-auth-store.ts';

export function ChatDialog() {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const messages = useChatStore((state) => state.messages);
  const currentUser = useAuthStore((state) => state.login);

  const filteredMessages = messages.filter(
    (message) =>
      (message.from === currentUser && message.to === selectedUser?.login) ||
      (message.from === selectedUser?.login && message.to === currentUser),
  );

  return (
    <ul className="mt-2 pr-2 space-y-1 overflow-y-auto max-h-[calc(70vh-100px)] flex-grow">
      {selectedUser ? (
        filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <Message
              key={message.id}
              id={message.id}
              to={message.to}
              from={message.from}
              text={message.text}
              datetime={message.datetime}
              status={message.status}
            />
          ))
        ) : (
          <div>No message history</div>
        )
      ) : (
        <p>Select a user to start chatting</p>
      )}
    </ul>
  );
}
