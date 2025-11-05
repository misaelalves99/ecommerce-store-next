// app/contexts/AuthProvider.tsx
'use client';

import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import { AuthContext, User } from './AuthContext';
import { auth, googleProvider, facebookProvider } from '../lib/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  User as FirebaseUser,
} from 'firebase/auth';

interface Props {
  children: ReactNode;
}

/** Converte FirebaseUser para o shape do app */
const toUser = (u: FirebaseUser): User => ({
  id: u.uid,
  name: u.displayName ?? '',
  email: u.email ?? '',
  photoURL: u.photoURL ?? undefined,
});

/** Mapeia códigos do Firebase para mensagens amigáveis */
const mapAuthError = (code?: string) => {
  switch (code) {
    case 'auth/invalid-email':
      return 'E-mail inválido.';
    case 'auth/user-not-found':
      return 'Usuário não encontrado.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'E-mail ou senha incorretos.';
    case 'auth/email-already-in-use':
      return 'Este e-mail já está cadastrado.';
    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente mais tarde.';
    case 'auth/unauthorized-domain':
      return 'Domínio não autorizado nas configurações do Firebase.';
    default:
      return 'Falha na autenticação. Tente novamente.';
  }
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Garante persistência de sessão no navegador
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(() => {});
  }, []);

  // Observa mudanças na sessão
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const formatted = toUser(fbUser);
        setUser(formatted);
        try {
          localStorage.setItem('authUser', JSON.stringify(formatted));
        } catch {}
      } else {
        setUser(null);
        try {
          localStorage.removeItem('authUser');
        } catch {}
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // -------- E-mail/Senha
  const login = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      return true; // onAuthStateChanged fará o setUser
    } catch (err: any) {
      console.error('login error:', err?.code, err?.message);
      return false;
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      if (cred.user && name.trim()) {
        await updateProfile(cred.user, { displayName: name.trim() });
      }
      return true; // onAuthStateChanged fará o setUser
    } catch (err: any) {
      console.error('register error:', err?.code, err?.message);
      return false;
    }
  }, []);

  // -------- Social
  const loginWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return true;
    } catch (err: any) {
      console.error('google login error:', err?.code, err?.message);
      return false;
    }
  }, []);

  const loginWithFacebook = useCallback(async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      return true;
    } catch (err: any) {
      console.error('facebook login error:', err?.code, err?.message);
      return false;
    }
  }, []);

  // -------- Logout
  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    try {
      localStorage.removeItem('authUser');
    } catch {}
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        mapAuthError,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
