import { ChatForm } from '../chat-form/chat-form.tsx';
import { useChatStore } from '../../stores/use-chat-store.ts';
import { ChatDialog } from '../chat-dialog/chat-dialog.tsx';

export function Chat() {
  const selectedUser = useChatStore((state) => state.selectedUser);

  return (
    <section className="border border-amber-600 opacity-80 rounded-lg shadow-sm p-4 m-1 flex flex-col max-h-[70vh] min-h-[70vh] max-[750px]:max-h-[48vh] max-[750px]:min-h-[48vh]">
      <h3 className=" border-b-2 text-teal-900 font-bold">
        Conversation:{' '}
        {selectedUser && (
          <span>
            {selectedUser.isLogined ? (
              <p className="truncate">😉 {selectedUser.login}</p>
            ) : (
              <p className="truncate">🫥 {selectedUser.login}</p>
            )}
          </span>
        )}
      </h3>
      <ChatDialog />
      <ChatForm />
    </section>
  );
}
