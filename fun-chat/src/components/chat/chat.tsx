import { ChatForm } from '../chat-form/chat-form.tsx';
import { useChatStore } from '../../store/use-chat-store.ts';

export function Chat() {
  const selectedUser = useChatStore((state) => state.selectedUser);

  return (
    <section className="border border-amber-600 opacity-80 rounded-lg shadow-sm p-4 m-1 flex flex-col max-h-[70vh]">
      <h3 className="border-b-2 text-teal-900 font-bold">
        Conversation: {selectedUser ? selectedUser.login : ''}
      </h3>
      {selectedUser ? <div>Messages</div> : <p>Select a user to start chatting</p>}
      <ChatForm />
    </section>
  );
}
