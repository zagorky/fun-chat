// import type { ServerResponse } from '../types/types.ts';
// import { useChatStore } from '../stores/use-chat-store.ts';
// import { useAuthStore } from '../stores/use-auth-store.ts';
//
// export const chatHandlers = {
//   USER_ACTIVE: (data: ServerResponse) => {
//     if (!data.payload) return;
//
//     useChatStore.setState((state) => {
//       const activeUsers = data.payload.users;
//
//       const users = [
//         ...activeUsers,
//         ...state.users.filter((u) => !activeUsers.some((au) => au.login === u.login)),
//       ];
//
//       return { activeUsers, users };
//     });
//   },
//   USER_INACTIVE: (data: ServerResponse) => {
//     useChatStore.setState((state) => {
//       const inactiveUsers = data.payload.users;
//
//       const users = [
//         ...state.activeUsers,
//         ...inactiveUsers.filter((u) => !state.activeUsers.some((au) => au.login === u.login)),
//       ];
//
//       return { users };
//     });
//   },
//   ERROR: (data: ServerResponse) => {
//     useChatStore.setState({ error: data.payload.error });
//   },
//   USER_EXTERNAL_LOGOUT: (data: ServerResponse) => {
//     const updatedUser = data.payload.user;
//
//     useChatStore.setState((state) => ({
//       activeUsers: [...state.activeUsers, updatedUser],
//       users: state.users.some((u) => u.login === updatedUser.login)
//         ? state.users.map((u) => (u.login === updatedUser.login ? updatedUser : u))
//         : [...state.users, updatedUser],
//     }));
//   },
//   USER_EXTERNAL_LOGIN: (data: ServerResponse) => {
//     const updatedUser = data.payload.user;
//
//     useChatStore.setState((state) => ({
//       activeUsers: state.activeUsers.filter((u) => u.login !== updatedUser.login),
//       users: state.users.map((u) => (u.login === updatedUser.login ? updatedUser : u)),
//     }));
//   },
//   MSG_FROM_USER: (data: ServerResponse) => {
//     useChatStore.setState({ messages: data.payload.messages });
//   },
//   USER_LOGOUT: () => {
//     useChatStore.setState({ selectedUser: null });
//   },
//   MSG_SEND: (data: ServerResponse) => {
//     const message = data.payload.message;
//     const isIncomingMessage = message.from !== useAuthStore.getState().login;
//
//     useChatStore.setState((state) => {
//       if (isIncomingMessage) {
//         return {
//           messages: [...state.messages, message].sort((a, b) => a.datetime - b.datetime),
//         };
//       }
//
//       return {
//         messages: state.messages.map((message_) =>
//           message_.text === message.text && !message_.status.isDelivered ? message : message_,
//         ),
//       };
//     });
//   },
// };
