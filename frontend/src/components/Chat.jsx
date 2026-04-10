import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../context/SocketContext';

function Chat({ sellerId, gigId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSocket();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', (data) => {
        if (data.from === sellerId || data.from === user?.id) {
          setMessages((prev) => [...prev, data]);
        }
      });
    }
    return () => socket?.off('receive-message');
  }, [socket, sellerId, user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const messageData = { to: sellerId, from: user?.id, message: newMessage, gigId, timestamp: new Date() };
    socket?.emit('send-message', messageData);
    setMessages((prev) => [...prev, { ...messageData, from: user?.id }]);
    setNewMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-xl shadow-xl border z-50">
      <div className="bg-[#8B5E3C] text-white p-3 rounded-t-xl flex justify-between">
        <span>💬 Chat with Seller</span>
        <button onClick={onClose} className="hover:text-gray-200">✕</button>
      </div>
      <div className="h-80 overflow-y-auto p-3 bg-gray-50">
        {messages.length === 0 && <div className="text-center text-gray-400 mt-32">No messages yet.</div>}
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-3 flex ${msg.from === user?.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-2 rounded-lg ${msg.from === user?.id ? 'bg-[#8B5E3C] text-white rounded-br-none' : 'bg-gray-200 rounded-bl-none'}`}>
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs opacity-70 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 border-t flex gap-2">
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#8B5E3C]" />
        <button onClick={sendMessage} className="bg-[#8B5E3C] text-white px-4 py-2 rounded-lg hover:bg-[#5C4033] transition">Send</button>
      </div>
    </div>
  );
}

export default Chat;