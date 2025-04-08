interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export default function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[80%] p-4 rounded-lg ${
        isBot 
          ? 'bg-[#1a1a1a] text-white' 
          : 'bg-[#B666FF] text-white'
      }`}>
        {message}
      </div>
    </div>
  );
}