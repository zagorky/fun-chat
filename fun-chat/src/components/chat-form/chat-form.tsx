import { Input } from '../input/input.tsx';
import { useState } from 'react';
import { Button } from '../button/button.tsx';

export function ChatForm() {
  const [message, setMessage] = useState('');

  return (
    <form onSubmit={() => console.log('message submit')}>
      <Input
        id={'chat-input'}
        label={''}
        type={'text'}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button type={'submit'} disabled={false} onClick={(event) => event.preventDefault()}>
        Send
      </Button>
    </form>
  );
}
