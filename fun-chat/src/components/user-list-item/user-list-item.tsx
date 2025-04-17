import { useChatStore } from '../../stores/use-chat-store.ts';
import type { UserType } from '../../types/types.ts';

export function UserListItem(user: UserType) {
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const selectedUser = useChatStore((state) => state.selectedUser);

  return (
    <li className="w-full" key={user.login}>
      <label className=" flex p-1 items-center space-x-3 cursor-pointer has-checked:bg-gray-300 has-checked:ring-gray-300 rounded has-checked:text-teal-900">
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
  );
}
