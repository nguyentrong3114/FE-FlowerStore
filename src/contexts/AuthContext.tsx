'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '@/services/auth.service';

interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.isLogin()
      .then(res => {
        console.log("Profile loaded", res.data); 
        setUser(res.data);
      })
      .catch(err => {
        console.error("Lỗi khi gọi /session:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);
  

  const logout = async () => {
    try {
      await AuthService.logout(); 
    } catch {
        console.log('logout failed');
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
