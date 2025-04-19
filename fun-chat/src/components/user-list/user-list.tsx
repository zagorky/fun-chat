import { useChatStore } from '../../stores/use-chat-store.ts';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/use-auth-store.ts';
import { Input } from '../input/input.tsx';
import { UserListItem } from '../user-list-item/user-list-item.tsx';

export function UserList() {
  const users = useChatStore((state) => state.users);
  const error = useChatStore((state) => state.error);
  const getUsers = useChatStore((state) => state.getUsers);
  const currentUser = useAuthStore((state) => state.login);
  const [searchParameter, setSearchParameter] = useState('');
  const activeUsers = useChatStore((state) => state.activeUsers);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    if (user.login === currentUser) {
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
    <section className=" relative overflow-hidden border border-b-pink-900 opacity-80 rounded-lg shadow-sm p-4 m-1 flex flex-col h-[70vh] min-h-[70vh] max-[750px]:max-h-[30vh] max-[750px]:min-h-[30vh]">
      <h3 className="border-b-2 text-teal-900 font-bold">Online users: {activeUsers.length}</h3>
      <Input
        id="search"
        label=""
        value={searchParameter}
        onChange={(event) => setSearchParameter(event.target.value)}
        type="text"
        placeholder="Search..."
      />
      <ul className=" relative mt-2 pr-2 space-y-1 overflow-y-auto flex-1">
        {filteredUsers.map((user) => (
          <UserListItem key={user.login} login={user.login} isLogined={user.isLogined} />
        ))}
      </ul>
    </section>
  );
}
