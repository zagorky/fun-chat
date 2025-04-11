export function Form() {
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
