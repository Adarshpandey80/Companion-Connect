import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

function ChatModal({ companion, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  if (!companion) return null;

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md h-96 flex flex-col">
        <div className="border-b flex justify-between items-center p-4">
          <h2 className="font-bold">Chat with {companion.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button onClick={handleSend} className="bg-purple-500 text-white p-2 rounded-lg">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatModal;
