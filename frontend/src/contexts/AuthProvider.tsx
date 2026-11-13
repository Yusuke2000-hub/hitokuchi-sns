import React, { useCallback, useState } from 'react';
import type { AuthResponse } from '../types/auth';
import { AuthContext } from './AuthContext';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(() => {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  });
  const [username, setUsername] = useState<string | null>(
    () => localStorage.getItem('username')
  );

  const login = useCallback((data: AuthResponse) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('userId', String(data.userId));
    localStorage.setItem('username', data.username);
    setUserId(data.userId);
    setUsername(data.username);
  }, []);

  const logout = useCallback(() => {
    ['accessToken', 'refreshToken', 'userId', 'username'].forEach((k) =>
      localStorage.removeItem(k)
    );
    setUserId(null);
    setUsername(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: userId !== null, userId, username, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
