import { ChatForm2 } from '../chat-form/chat-form.tsx';

export function Chat() {
  return (
    <section className="border border-amber-600 opacity-80 rounded-lg shadow-sm p-4 m-1 min-h-32">
      <div className="grid grid-cols-2 gap-4">MESSAGES</div>
      <ChatForm2 />
    </section>
  );
}
