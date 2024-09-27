import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;  
  name: string; 
  email: string; 
}

interface MyContextType {
  user: User | null;
  setIdUser: (idUser: string | null) => void; 
  isLoading: boolean;
}

export const MyContext = createContext<MyContextType | null>(null);

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [idUser, setIdUser] = useState<string | null>(localStorage?.getItem('idUser'));
  

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const token = localStorage?.getItem('token'); 
        

        if (token && idUser) {

          const response = await axios.get(`http://localhost:3001/user/${idUser}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [idUser])

  return (
    <MyContext.Provider value={{ user, setIdUser, isLoading }}>
      {children}
    </MyContext.Provider>
  );
};
