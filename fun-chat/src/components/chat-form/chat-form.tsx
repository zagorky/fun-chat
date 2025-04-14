import { AuthorizationInput } from '../authorization-input/authorization-input.tsx';
import { useCallback } from 'react';
import { Button } from '../button/button.tsx';

export function ChatForm() {
  const style = [
    'px-4',
    'py-2',
    'm-1',
    'border',
    'border-gray-300',
    'rounded-md',
    'shadow-sm',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-pink-500',
    'focus:border-pink-500',
    'transition',
    'duration-200',
  ];

  const formStyle = ['flex', 'items-center', 'justify-center', 'flex-col'];

  return (
    <form className={[...formStyle].join(' ')} name={'publish'}>
      <input
        className={[...style].join(' ')}
        type="text"
        name="message"
        placeholder="Start typing..."
      />
      <input type="submit" value="Send" />
    </form>
  );
}

export function ChatForm2() {
  const handleMessageSubmit = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  return (
    <form onSubmit={() => console.log('message submit')}>
      <AuthorizationInput
        id={'chat-input'}
        label={'Your message'}
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
