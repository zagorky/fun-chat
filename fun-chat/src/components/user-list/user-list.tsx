import { useChatStore } from '../../store/use-chat-store.ts';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/use-auth-store.ts';
import { Input } from '../input/input.tsx';

export function UserList() {
  const getUsers = useChatStore((state) => state.getUsers);
  const users = useChatStore((state) => state.users);
  const error = useChatStore((state) => state.error);
  const currentUser = useAuthStore((state) => state.login);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const selectedUser = useChatStore((state) => state.selectedUser);
  const [searchParameter, setSearchParameter] = useState('');

  // TODO понять как убрать двойной запрос пользователей
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
    <section className="border border-b-pink-900 opacity-80 rounded-lg shadow-sm p-4 m-1 flex flex-col max-h-[70vh] max-[750px]:max-h-[30vh]">
      <h3 className="border-b-2 text-teal-900 font-bold">Online users:</h3>
      <Input
        id="search"
        label=""
        value={searchParameter}
        onChange={(event) => setSearchParameter(event.target.value)}
        type="text"
        placeholder="Search..."
      />
      <ul className="mt-2 pr-2 space-y-1 overflow-y-auto max-h-[calc(70vh-100px)] flex-grow">
        {filteredUsers.map((user) => (
          <li className="w-full" key={user.login}>
            <label className=" flex items-center space-x-3 cursor-pointer has-checked:bg-gray-300 has-checked:ring-gray-300 rounded has-checked:text-teal-900">
              <input
                type="radio"
                name="selectedUser"
                value={user.login}
                checked={selectedUser?.login === user.login}
                onChange={() => setSelectedUser(user)}
                className="sr-only checked:bg-blue-500"
              />
              <span>{user.isLogined ? '😉' : '🫥'}</span>
              <span>{user.login}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
