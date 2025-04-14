import { useEffect } from 'react';
import { connectSocket } from './socket.ts';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router.tsx';

function App() {
  useEffect(() => {
    connectSocket('ws://localhost:4000');
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
