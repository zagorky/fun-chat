import type { MessageType } from '../../types/types.ts';
import { useAuthStore } from '../../stores/use-auth-store.ts';
import { useChatStore } from '../../stores/use-chat-store.ts';
import React, { useState } from 'react';

export function Message(props: MessageType) {
  const currentUser = useAuthStore((state) => state.login);
  const isCurrentUser = props.from === currentUser;
  const editMessage = useChatStore((state) => state.editMessage);
  const deleteMessage = useChatStore((state) => state.deleteMessage);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.text);

  const date = new Date(props.datetime);

  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editedText !== props.text) {
      editMessage(props.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <li className={props.from === currentUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          isCurrentUser
            ? 'grid grid-rows-[auto_auto] rounded ring-2 m-1 p-1 ring-cyan-700 w-4/5 h-auto'
            : 'grid grid-rows-[auto_auto]  rounded ring-2 m-1 p-1 ring-lime-700  w-4/5 h-auto'
        }
      >
        <div className="flex justify-between items-center  max-w-[200px] max-h-[20px]">
          <p className=" truncate text-sm font-semibold text-cyan-700">{props.from}</p>
          {isCurrentUser && (
            <span className="flex gap-1 text-xs">
              <button
                className={'cursor-pointer'}
                type="button"
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                ✏️
              </button>
              <button
                className={'cursor-pointer'}
                type="button"
                onClick={() => deleteMessage(props.id)}
              >
                ✖️
              </button>
            </span>
          )}
        </div>

        {isEditing ? (
          <form className="my-1 max-w-[200px]" onSubmit={handleEdit}>
            <input
              value={editedText}
              onChange={(event) => setEditedText(event.target.value)}
              className="w-full p-1 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-700"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-1">
              <button
                type={'button'}
                onClick={() => setIsEditing(false)}
                className="px-2 py-1 text-xs text-gray-50 bg-rose-300 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type={'submit'}
                className="px-2 py-1 text-xs bg-emerald-500 text-white rounded cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <p className="max-w-[200px]">{props.text}</p>
        )}

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
