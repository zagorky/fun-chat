import { create } from 'zustand';
import { validateLogin, validatePassword } from '../utils/authorization.ts';
import type { ServerResponse } from '../types/types.ts';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

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
  clearAuthError: () => void;
  logout: () => void;
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

export const handleServerMessageForAuth = (data: ServerResponse) => {
  if (data.type === 'USER_LOGIN') {
    if (data.payload.user.isLogined) {
      useAuthStore.getState().loginSuccess();
    } else {
      useAuthStore.getState().loginFailure('Login failed: unknown reason');
    }
  } else if (data.type === 'USER_LOGOUT' && !data.payload.user.isLogined) {
    useAuthStore.getState().logout();
  }
  if (data.type === 'ERROR') {
    const error = data.payload.error;
    useAuthStore.getState().loginFailure(error);
  }
};
