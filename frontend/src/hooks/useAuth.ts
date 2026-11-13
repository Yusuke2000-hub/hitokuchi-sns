import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth は AuthProvider 内で使用してください');
  return ctx;
};

export default useAuth;
