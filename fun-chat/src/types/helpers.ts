export function isMessage<T>(data: unknown): data is T {
  return (
    typeof data === 'object' && data !== null && 'id' in data && 'type' in data && 'payload' in data
  );
}
