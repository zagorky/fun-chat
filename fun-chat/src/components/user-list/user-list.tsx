import { useChatStore } from '../../store/use-chat-store.ts';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/use-auth-store.ts';

export function UserList() {
  const getUsers = useChatStore((state) => state.getUsers);
  const users = useChatStore((state) => state.users);
  const error = useChatStore((state) => state.error);
  const currentUser = useAuthStore((state) => state.login);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <section className="border border-amber-600 opacity-80 rounded-lg shadow-sm p-4 m-1 min-h-32">
      <h3 className="border-b-2 text-teal-900 font-bold">Online users:</h3>
      <ul>
        {users.map((user) =>
          user.login === currentUser ? null : <li key={user.login}>😉{user.login}</li>,
        )}
      </ul>
    </section>
  );
}
