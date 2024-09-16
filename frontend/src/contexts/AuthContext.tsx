'use client'

import React, {useContext, useEffect, useState, createContext, ReactNode} from "react";
import {getCurrentUser, signOut as authSignOut} from "@/utils/auth";

interface AuthContextType {
  user: { [p: string]: string } | undefined | null;
  loading: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: () => {},
});


export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<{ [p: string]: string } | undefined | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signOut = () => {
    authSignOut();
    setUser(null);
  }
  return (
    <AuthContext.Provider value={ { user, loading, signOut } }>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);