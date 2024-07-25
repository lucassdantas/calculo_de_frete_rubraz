// src/context/userContext.tsx

import { User } from '@/types/user';
import React, { createContext, useState, ReactNode } from 'react';


interface UserContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
}

const defaultUser: User = {
  userId: 0,
  userName: '',
  userPhone: '',
  userEmail: '',
  userCnpj: '',
  userHasImage: false,
  userDateOfCreation: '',
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
