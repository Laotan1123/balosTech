import { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

const ChatBot = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Initial greeting
    setMessages(prev => [
      ...prev,
      {
        type: 'bot',
        content: "Hello! How can I assist you today?",
        timestamp: new Date()
      }
    ]);
    
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('track') && input.includes('order')) {
      return 'To track your order, please visit the Orders page and enter your order number. Need help finding it?';
    }
    
    if (input.includes('return') || input.includes('refund')) {
      return 'Our return policy allows returns within 30 days of purchase. Would you like me to guide you through the return process?';
    }
    
    if (input.includes('repair') || input.includes('fix')) {
      return 'We offer repair services for phones, laptops, tablets, and more. Would you like to schedule a repair appointment?';
    }
    
    if (input.includes('price') || input.includes('cost')) {
      return 'Our prices vary by product and service. Can you tell me which specific item or service you\'re interested in?';
    }
    
    if (input.includes('speak') && input.includes('human')) {
      return 'I\'ll connect you with a human support agent. Please note that our support hours are Mon-Fri 9am-7pm, Sat 10am-5pm WAT.';
    }

    return "I'm not sure I understand. Could you rephrase that or choose from these common topics: Order Tracking, Returns, Repairs, Pricing, or speak to a human agent?";
  };

  return (
    <div className="fixed bottom-8 right-8 w-96 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-4 rounded-t-xl flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6" />
          <span className="font-semibold">Balos Support</span>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-red-700 p-1 rounded-full transition duration-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {message.type === 'bot' ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="text-xs opacity-75">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border-gray-300 focus:border-red-600 focus:ring-red-600"
          />
          <button
            onClick={handleSend}
            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;