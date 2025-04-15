import { ChatForm } from '../chat-form/chat-form.tsx';

export function Chat() {
  return (
    <section className="border border-amber-600 opacity-80 rounded-lg shadow-sm p-4 m-1 h-full overflow-y-auto">
      <h3 className="border-b-2 text-teal-900 font-bold">Conversation:</h3>
      <ChatForm />
    </section>
  );
}
