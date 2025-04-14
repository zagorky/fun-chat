import { create } from 'zustand';
import { validateLogin, validatePassword } from '../utils/utilities.ts';
import { sendWebSocketMessage } from '../socket.ts';
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
  sessionToken: string;

  setLogin: (login: string) => void;
  setPassword: (password: string) => void;
  setErrors: (errors: { login: string; password: string }) => void;
  loginSuccess: () => void;
  loginFailure: (error: string) => void;
  validateAndSubmit: (event: React.FormEvent) => void;
  clearAuthError: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        login: '',
        password: '',
        errors: {
          login: '',
          password: '',
        },
        authError: '',
        isAuthenticated: false,
        sessionToken: '',

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

        validateAndSubmit: (event) => {
          event.preventDefault();
          const { login, password } = get();

          const loginError = validateLogin(login);
          const passwordError = validatePassword(password);

          if (loginError || passwordError) {
            set(
              {
                errors: {
                  login: loginError,
                  password: passwordError,
                },
              },
              false,
              'validateAndSubmit/error',
            );
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

        clearAuthError: () => set({ authError: '' }, false, 'clearAuthError'),

        logout: () => {
          const currentState = get();

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
      }),
      {
        name: 'AuthStore',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export const handleServerMessage = (data: ServerResponse) => {
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
