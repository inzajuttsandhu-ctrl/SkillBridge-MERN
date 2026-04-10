import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);
      newSocket.emit('user-joined', user.id);
      return () => newSocket.close();
    }
  }, [isAuthenticated, user]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};