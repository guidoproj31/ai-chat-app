'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '@/components/layout/Navbar';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';

interface Message {
  text: string;
  isBot: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    
    // Add user message
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    
    try {
      const response = await axios.post('http://localhost:5678/webhook/67e404b8-4ec9-42c1-97d2-736fab4e5164', {
        message: message
      });

      // Handle the response object that contains an output key
      const aiResponse = response.data.output || response.data.response || "No response received";
      
      setMessages(prev => [...prev, { 
        text: aiResponse, 
        isBot: true 
      }]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I couldn't process your request. Please try again.", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex flex-col items-center justify-between px-4 pt-20">
        <h1 className="text-5xl font-bold text-center mb-20">
          <span className="text-[#B666FF]">Zapps AI:</span> Your Intelligent
          <br />Assistant
        </h1>

        {/* Chat Messages */}
        <div className="w-full max-w-2xl mb-8 space-y-4 overflow-y-auto max-h-[60vh]">
          {messages.map((msg, index) => (
            <ChatMessage 
              key={index}
              message={msg.text}
              isBot={msg.isBot}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-[#1a1a1a] text-white p-4 rounded-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-[#B666FF] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-[#B666FF] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-[#B666FF] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}















