import { useAuthStore } from '../../stores/use-auth-store.ts';
import { sendWebSocketMessage } from '../socket.ts';
import { useChatStore } from '../../stores/use-chat-store.ts';
import type React from 'react';

export function validateLogin(login: string) {
  const MIN_LENGTH = 4;
  if (!login) {
    return 'Login is required';
  }
  if (login.length < MIN_LENGTH) {
    return 'Login must be at least 4 symbols';
  }
  return '';
}

export function validatePassword(password: string) {
  const MIN_LENGTH = 6;
  if (!password) {
    return 'Password is required';
  }
  if (password.length < MIN_LENGTH) {
    return `Password must be at least ${MIN_LENGTH} characters long`;
  }
  if (!/^(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
    return 'Password must contain at least one uppercase latin letter and one number';
  }
  return '';
}

export const handleLoginSubmit = (event: React.FormEvent) => {
  event.preventDefault();

  const { login, password, setErrors } = useAuthStore.getState();

  const loginError = validateLogin(login);
  const passwordError = validatePassword(password);

  if (loginError || passwordError) {
    setErrors({ login: loginError, password: passwordError });
    return;
  }

  sendLoginMessage(login, password);
};

export const sendLoginMessage = (login: string, password: string) => {
  sendWebSocketMessage({
    id: crypto.randomUUID(),
    type: 'USER_LOGIN',
    payload: {
      user: { login, password },
    },
  });
};

export const sendLogoutMessage = (login: string, password: string) => {
  sendWebSocketMessage({
    id: crypto.randomUUID(),
    type: 'USER_LOGOUT',
    payload: {
      user: { login, password },
    },
  });
};

export const handleLogout = () => {
  const { login, password, isAuthenticated, logout } = useAuthStore.getState();
  useChatStore.setState({ selectedUser: null });

  if (isAuthenticated && login && password) {
    sendLogoutMessage(login, password);
    logout();
  }
};
