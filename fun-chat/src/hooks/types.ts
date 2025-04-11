export type WebSocketEventType =
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'USER_ACTIVE'
  | 'ERROR'
  | 'USER_EXTERNAL_LOGIN'
  | 'USER_EXTERNAL_LOGOUT'
  | 'USER_INACTIVE'
  | 'MSG_SEND'
  | 'MSG_FROM_USER'
  | 'MSG_DELIVER'
  | 'MSG_READ'
  | 'MSG_DELETE'
  | 'MSG_EDIT';

export type UserType = {
  login: string;
  isLogined?: boolean;
};

export type MessageStatusType = {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
};

export type MessageType = {
  id: string;
  to: string;
  from: string;
  text: string;
  datetime: number;
  status: MessageStatusType;
};

export type LoginPayloadType = {
  user: { login: string; password: string };
};

export type UserListPayloadType = {
  users: UserType[];
};

export type MessagePayloadType = {
  message:
    | MessageType
    | {
        id?: string;
        to?: string;
        text?: string;
      };
};

export type ErrorPayload = {
  error: string;
};

export type WebSocketPayload =
  | LoginPayloadType
  | ErrorPayload
  | MessagePayloadType
  | UserListPayloadType
  | null;

export type WebSocketMessageType = {
  id: string | null;
  type: WebSocketEventType;
  payload: WebSocketPayload;
};
