'use client';
import { AuthContext, AuthContextProps } from '@/contexts/authContext';
import { useContext } from 'react';

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth need be called into the AuthProvider.');
  }
  return context;
}
