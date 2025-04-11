type MessageProps = {
  text: string;
};

export function Message(props: MessageProps) {
  const { text } = props;
  return <div id="message">{text}</div>;
}
