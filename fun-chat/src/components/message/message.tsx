import type { MessageType } from '../../types/types.ts';
import { useAuthStore } from '../../store/use-auth-store.ts';

export function Message(props: MessageType) {
  const currentUser = useAuthStore((state) => state.login);
  const date = new Date(props.datetime);
  return (
    <li className={props.from === currentUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          props.from === currentUser
            ? 'grid grid-rows-2 rounded ring-2 m-1 p-1 ring-cyan-700  w-2/3'
            : 'grid grid-rows-2 rounded ring-2 m-1 p-1 ring-lime-700  w-2/3'
        }
      >
        <p>{props.text}</p>
        <span className="size-xs">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      </div>
    </li>
  );
}
