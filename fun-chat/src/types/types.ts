type MessageStatusType = {
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

type RequestError =
  | 'incorrect request structure'
  | 'incorrect type parameters'
  | 'incorrect payload parameters'
  | 'internal server error';

type MessageError = 'incorrect message id' | 'user not recipient cannot be executed';

type HistoryError =
  | 'sender and recipient logins are the same'
  | 'the user with the specified login does not exist'
  | 'user not registered or not logged';

type AuthError =
  | 'incorrect password'
  | 'a user with this login is already authorized'
  | 'there is no user with this login'
  | 'the user was not authorized'
  | 'another user is already authorized in this connection';

type ErrorType = AuthError | HistoryError | RequestError | MessageError;

export type UserType = {
  login: string;
  password?: string;
  isLogined?: boolean;
};

export type BaseMessage<T extends string, P> = {
  id: string | null;
  type: T;
  payload: P;
};

export type ServerMessage =
  | BaseMessage<
      'USER_LOGIN' | 'USER_LOGOUT' | 'USER_EXTERNAL_LOGIN' | 'USER_EXTERNAL_LOGOUT',
      {
        user: {
          login: string;
          isLogined: boolean;
        };
      }
    >
  | BaseMessage<'ERROR', { error: ErrorType }>
  | BaseMessage<
      'USER_ACTIVE' | 'USER_INACTIVE',
      {
        users: UserType[];
      }
    >
  | BaseMessage<
      'MSG_FROM_USER',
      {
        messages: MessageType[];
      }
    >
  | BaseMessage<
      'MSG_READ',
      {
        message: {
          id: string;
          status: {
            isReaded: boolean;
          };
        };
      }
    >
  | BaseMessage<
      'MSG_DELETE',
      {
        message: {
          id: string;
          status: {
            isDeleted: boolean;
          };
        };
      }
    >
  | BaseMessage<
      'MSG_EDIT',
      {
        message: {
          id: string;
          text: string;
          status: {
            isEdited: boolean;
          };
        };
      }
    >
  | BaseMessage<'MSG_SEND' | 'MSG_DELIVER', { message: MessageType }>;

export type ClientRequest =
  | BaseMessage<
      'USER_LOGIN' | 'USER_LOGOUT',
      {
        user: {
          login: string;
          password: string;
        };
      }
    >
  | BaseMessage<'USER_ACTIVE' | 'USER_INACTIVE', null>
  | BaseMessage<
      'MSG_SEND' | 'MSG_EDIT',
      {
        message: {
          to: string;
          text: string;
        };
      }
    >
  | BaseMessage<
      'MSG_FROM_USER',
      {
        user: {
          login: string;
        };
      }
    >
  | BaseMessage<
      'MSG_READ' | 'MSG_DELETE',
      {
        message: {
          id: string;
        };
      }
    >
  | BaseMessage<
      'MSG_EDIT',
      {
        message: {
          id: string;
          text: string;
        };
      }
    >;
