'use client';
import { createContext, useContext, useRef, } from 'react';

const SocektContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
  const socket = useRef(null);

  return (
    <SocektContext.Provider value={socket}>
      {children}
    </SocektContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocektContext);