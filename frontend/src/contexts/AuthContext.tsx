import { createContext } from 'react';
import type { AuthResponse } from '../types/auth';

export interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  username: string | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
