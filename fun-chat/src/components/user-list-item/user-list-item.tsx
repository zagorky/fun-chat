import { useChatStore } from '../../stores/use-chat-store.ts';
import type { UserType } from '../../types/types.ts';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/use-auth-store.ts';

export function UserListItem(user: UserType) {
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const selectedUser = useChatStore((state) => state.selectedUser);
  const messages = useChatStore((state) => state.messages);
  const currentUserLogin = useAuthStore((state) => state.login);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = messages.filter(
      (message) =>
        message.from === user.login && message.to === currentUserLogin && !message.status.isReaded,
    ).length;

    setUnreadCount(count);
  }, [messages, user.login, currentUserLogin]);
  return (
    <li className="w-full" key={user.login}>
      <label className=" hover:bg-pink-100 flex justify-between p-1 items-center space-x-3 cursor-pointer has-checked:bg-emerald-100 has-checked:ring-gray-300 rounded has-checked:text-teal-900">
        <input
          type="radio"
          name="selectedUser"
          value={user.login}
          checked={selectedUser?.login === user.login}
          onChange={() => setSelectedUser(user)}
          className="sr-only checked:bg-blue-500 "
        />
        <span className="inline-flex">
          <span>{user.isLogined ? '😉' : '🫥'}</span>
          <p className="truncate">{user.login}</p>{' '}
        </span>

        {unreadCount > 0 && (
          <span className="border-b-2 border-b-pink-900 flex justify-end px-2 mx-2">
            {unreadCount}
          </span>
        )}
      </label>
    </li>
  );
}
