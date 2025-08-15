'use client';
import { createContext, useContext, useState } from 'react';

const GroupMemberContext = createContext(null);

export const GroupMemberProvider = ({ children }) => {
  const [allmembers, setAllmembers] = useState({members : [] , pokemonData : []});

  return (
    <GroupMemberContext.Provider value={{allmembers, setAllmembers}}>
      {children}
    </GroupMemberContext.Provider>
  );
};

export const useGroupMemberContext = () => useContext(GroupMemberContext);