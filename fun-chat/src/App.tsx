import { AuthorizationPage } from './pages/authorization-page/authorization-page.tsx';
import { useEffect } from 'react';
import { connectSocket } from './socket.ts';

function App() {
  useEffect(() => {
    connectSocket('ws://localhost:4000');
  }, []);
  return (
    <>
      <div>
        <AuthorizationPage />
      </div>
    </>
  );
}

export default App;
