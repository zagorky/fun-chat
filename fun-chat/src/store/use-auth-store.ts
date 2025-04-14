import { create } from 'zustand';
import { validateLogin, validatePassword } from '../utils/utilities.ts';
import { sendWebSocketMessage } from '../socket.ts';
import type { ServerResponse } from '../types/types.ts';

type AuthStore = {
  login: string;
  password: string;
  errors: {
    login: string;
    password: string;
  };
  authError: string;
  isAuthenticated: boolean;

  setLogin: (login: string) => void;
  setPassword: (password: string) => void;
  setErrors: (errors: { login: string; password: string }) => void;
  loginSuccess: () => void;
  loginFailure: (error: string) => void;
  validateAndSubmit: (event: React.FormEvent) => void;
  clearAuthError: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  login: '',
  password: '',
  errors: {
    login: '',
    password: '',
  },
  authError: '',
  isAuthenticated: false,

  setLogin: (login) =>
    set((state) => ({
      login,
      errors: {
        ...state.errors,
        login: validateLogin(login),
      },
    })),

  setPassword: (password) =>
    set((state) => ({
      password,
      errors: {
        ...state.errors,
        password: validatePassword(password),
      },
    })),

  setErrors: (errors) => set({ errors }),

  loginSuccess: () => set({ isAuthenticated: true, authError: '' }),

  loginFailure: (error) => set({ authError: error, isAuthenticated: false }),

  validateAndSubmit: (event) => {
    event.preventDefault();
    const { login, password } = get();

    const loginError = validateLogin(login);
    const passwordError = validatePassword(password);

    if (loginError || passwordError) {
      set({
        errors: {
          login: loginError,
          password: passwordError,
        },
      });
      return;
    }

    sendWebSocketMessage({
      id: crypto.randomUUID(),
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: login,
          password: password,
        },
      },
    });
  },
  clearAuthError: () => set({ authError: '' }),
  logout: () => {
    const currentState = get();

    set({
      login: '',
      password: '',
      errors: {
        login: '',
        password: '',
      },
      authError: '',
      isAuthenticated: false,
    });

    if (currentState.isAuthenticated) {
      sendWebSocketMessage({
        id: crypto.randomUUID(),
        type: 'USER_LOGOUT',
        payload: {
          user: {
            login: currentState.login,
            password: currentState.password,
          },
        },
      });
    }
  },
}));

export const handleServerMessage = (data: ServerResponse) => {
  if (data.type === 'USER_LOGIN') {
    if (data.payload.user.isLogined) {
      useAuthStore.getState().loginSuccess();
    } else {
      useAuthStore.getState().loginFailure('Login failed: unknown reason');
    }
  }
  if (data.type === 'ERROR') {
    const error = data.payload.error;
    useAuthStore.getState().loginFailure(error);
  }
};
