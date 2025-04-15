import { useChatStore } from '../../store/use-chat-store.ts';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/use-auth-store.ts';
import { Input } from '../input/input.tsx';

export function UserList() {
  const getUsers = useChatStore((state) => state.getUsers);
  const users = useChatStore((state) => state.users);
  const error = useChatStore((state) => state.error);
  const currentUser = useAuthStore((state) => state.login);
  const [searchParameter, setSearchParameter] = useState('');

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    if (user.login === currentUser || !user.isLogined) {
      return false;
    }
    if (!searchParameter) {
      return true;
    }
    return user.login.toLowerCase().includes(searchParameter.toLowerCase());
  });

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <section className="border border-b-pink-900 opacity-80 rounded-lg shadow-sm p-4 m-1 min-h-32 overflow-y-auto">
      <h3 className="border-b-2 text-teal-900 font-bold">Online users:</h3>
      <Input
        id="search"
        label=""
        value={searchParameter}
        onChange={(event) => setSearchParameter(event.target.value)}
        type="text"
        placeholder="Search..."
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.login}>😉{user.login}</li>
        ))}
      </ul>
    </section>
  );
}
