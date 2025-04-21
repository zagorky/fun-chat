import { create } from 'zustand';
import { validateLogin, validatePassword } from '../api/utils/authorization.ts';
import type { ServerMessage } from '../types/types.ts';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { getUsersUtility } from '../api/utils/get-users.ts';

type AuthStore = {
  login: string;
  password: string;
  errors: {
    login: string;
    password: string;
  };
  authError: string;
  isAuthenticated: boolean;
  isConnecting: boolean;
  isReconnecting: boolean;
  setLogin: (login: string) => void;
  setPassword: (password: string) => void;
  setErrors: (errors: { login: string; password: string }) => void;
  loginSuccess: () => void;
  loginFailure: (error: string) => void;
  clearAuthError: () => void;
  logout: () => void;
  setReconnecting: (value: boolean) => void;
  setConnecting: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        login: '',
        password: '',
        errors: {
          login: '',
          password: '',
        },
        authError: '',
        isAuthenticated: false,
        isReconnecting: false,
        isConnecting: false,
        setReconnecting: (value) => set({ isReconnecting: value }, false, 'setReconnecting'),
        setConnecting: (value) => set({ isConnecting: value }, false, 'setConnecting'),
        setLogin: (login) =>
          set(
            (state) => ({
              login,
              errors: {
                ...state.errors,
                login: validateLogin(login),
              },
            }),
            false,
            'setLogin',
          ),
        setPassword: (password) =>
          set(
            (state) => ({
              password,
              errors: {
                ...state.errors,
                password: validatePassword(password),
              },
            }),
            false,
            'setPassword',
          ),
        setErrors: (errors) => set({ errors }, false, 'setErrors'),
        loginSuccess: () => set({ isAuthenticated: true, authError: '' }, false, 'loginSuccess'),
        loginFailure: (error) =>
          set({ authError: error, isAuthenticated: false }, false, 'loginFailure'),
        clearAuthError: () => set({ authError: '' }, false, 'clearAuthError'),
        logout: () => {
          set(
            {
              login: '',
              password: '',
              errors: {
                login: '',
                password: '',
              },
              authError: '',
              isAuthenticated: false,
            },
            false,
            'logout/reset',
          );
        },
      }),
      {
        name: 'AuthStore',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export const handleServerMessageForAuth = (data: ServerMessage) => {
  switch (data.type) {
    case 'USER_LOGIN': {
      if (data.payload.user.isLogined) {
        useAuthStore.getState().loginSuccess();
        getUsersUtility();
      } else {
        useAuthStore.getState().loginFailure('Login failed: unknown reason');
      }
      break;
    }
    case 'USER_LOGOUT': {
      if (!data.payload.user.isLogined) {
        useAuthStore.getState().logout();
      }
      break;
    }
    case 'ERROR': {
      const error = data.payload.error;
      useAuthStore.getState().loginFailure(error);
      break;
    }
  }
};
