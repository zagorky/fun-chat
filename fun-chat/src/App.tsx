import { useEffect } from 'react';
import { connectSocket, disconnectSocket } from './api/socket.ts';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router.tsx';
import { Loader } from './components/loader/loader.tsx';

function App() {
  useEffect(() => {
    connectSocket('ws://localhost:4000');
    return () => disconnectSocket();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Loader />
    </>
  );
}

export default App;
