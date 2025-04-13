import { Header1 } from '../components/headers/headers.tsx';
import { useEffect, useReducer } from 'react';
import { subscribeToMessages, sendWebSocketMessage } from '../socket.ts';
import { AuthorizationForm } from '../components/authorization-form/authorization-form.tsx';
import { Header } from '../components/header/header.tsx';
import { Footer } from '../components/footer/footer.tsx';
import { useNavigate } from '@tanstack/react-router';
import { validateLogin, validatePassword } from '../utils/utilities.ts';
import type { ServerResponse } from '../types/types.ts';

export type InitialStateType = {
  login: string;
  password: string;
  errors: {
    login: string;
    password: string;
  };
  authError: string;
  isAuthenticated: boolean;
};

export type ActionType =
  | { type: 'setLogin'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setErrors'; payload: { login: string; password: string } }
  | { type: 'loginSuccess' }
  | { type: 'loginFailure'; payload: string };

const reducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case 'setLogin': {
      return {
        ...state,
        login: action.payload,
        errors: {
          ...state.errors,
          login: validateLogin(action.payload),
        },
      };
    }
    case 'setPassword': {
      return {
        ...state,
        password: action.payload,
        errors: {
          ...state.errors,
          password: validatePassword(action.payload),
        },
      };
    }
    case 'setErrors': {
      return {
        ...state,
        errors: action.payload,
      };
    }
    case 'loginSuccess': {
      return { ...state, isAuthenticated: true, authError: '' };
    }
    case 'loginFailure': {
      return { ...state, authError: action.payload, isAuthenticated: false };
    }
    default: {
      return state;
    }
  }
};

const initialState: InitialStateType = {
  login: '',
  password: '',
  errors: {
    login: '',
    password: '',
  },
  authError: '',
  isAuthenticated: false,
};

export default function AuthorizationPage() {
  const navigate = useNavigate();
  const [form, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (form.isAuthenticated) {
      console.log('Redirect to main page');
      navigate({ to: '/main' }).catch((error) => console.log(error));
    }
  }, [form.isAuthenticated, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const loginError = validateLogin(form.login);
    const passwordError = validatePassword(form.password);

    if (loginError || passwordError) {
      dispatch({
        type: 'setErrors',
        payload: {
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
          login: form.login,
          password: form.password,
        },
      },
    });
  };

  useEffect(() => {
    const handleServerMessage = (data: ServerResponse) => {
      if (data.type === 'USER_LOGIN') {
        if (data.payload.user.isLogined) {
          dispatch({ type: 'loginSuccess' });
        } else {
          dispatch({
            type: 'loginFailure',
            payload: 'Login failed: unknown reason',
          });
        }
      }
      if (data.type === 'ERROR') {
        const error = data.payload.error;
        dispatch({ type: 'loginFailure', payload: error });
      }
    };

    const cleanup = subscribeToMessages(handleServerMessage);
    return () => cleanup();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Header1 title={'Authorization Page'} />
        <AuthorizationForm
          state={form}
          onPasswordChange={(event) =>
            dispatch({ type: 'setPassword', payload: event.target.value })
          }
          onLoginChange={(event) => dispatch({ type: 'setLogin', payload: event.target.value })}
          onSubmit={handleSubmit}
        />
      </main>
      <Footer />
    </>
  );
}
