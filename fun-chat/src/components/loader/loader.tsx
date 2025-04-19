import { useAuthStore } from '../../stores/use-auth-store.ts';

export function Loader() {
  const isReconnecting = useAuthStore((state) => state.isReconnecting);
  if (!isReconnecting) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-90 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <p className="text-lg font-semibold text-pink-600">Lost connection...</p>
        <p className="text-gray-700 mt-2">Attempting to reconnect...</p>
      </div>
    </div>
  );
}
