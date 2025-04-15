import { Input } from '../input/input.tsx';
import { useCallback } from 'react';
import { Button } from '../button/button.tsx';

export function ChatForm() {
  const handleMessageSubmit = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  return (
    <form onSubmit={() => console.log('message submit')}>
      <Input
        id={'chat-input'}
        label={''}
        type={'text'}
        value={'heh'}
        onChange={handleMessageSubmit}
      />
      <Button type={'submit'} disabled={false} onClick={(event) => event.preventDefault()}>
        Send
      </Button>
    </form>
  );
}
