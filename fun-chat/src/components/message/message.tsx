import type { MessageType } from '../../types/types.ts';
import { useAuthStore } from '../../stores/use-auth-store.ts';

export function Message(props: MessageType) {
  const currentUser = useAuthStore((state) => state.login);
  const isCurrentUser = props.from === currentUser;

  const date = new Date(props.datetime);
  return (
    <li className={props.from === currentUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          isCurrentUser
            ? 'grid grid-rows-2 rounded ring-2 m-1 p-1 ring-cyan-700  w-2/3'
            : 'grid grid-rows-2 rounded ring-2 m-1 p-1 ring-lime-700  w-2/3'
        }
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">{props.from}</span>
          {isCurrentUser && (
            <span className="flex gap-1 text-xs">
              <button type="button">✏️</button>
              <button type="button">✖️</button>
            </span>
          )}
        </div>

        <p className="my-1">{props.text}</p>

        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{props.status.isEdited && '🖍 Edited'}</span>

          <span className="flex items-center gap-1">
            {isCurrentUser && (
              <>
                {props.status.isDelivered ? '📩' : '✉️'}
                {props.status.isReaded && '👀'}
              </>
            )}
            {date.toLocaleDateString()}{' '}
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </li>
  );
}
