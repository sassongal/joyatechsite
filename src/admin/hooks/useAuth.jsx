// src/admin/hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase-config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if user has admin privileges
        try {
          const tokenResult = await firebaseUser.getIdTokenResult();
          const hasAdminClaim = tokenResult.claims.admin === true;
          
          // Also check Firestore for admin status as fallback
          const userDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
          const isAdminInFirestore = userDoc.exists() && userDoc.data()?.isAdmin === true;
          
          const adminStatus = hasAdminClaim || isAdminInFirestore;
          
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL
          });
          setIsAdmin(adminStatus);
        } catch (err) {
          console.error('Error checking admin status:', err);
          setUser(null);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Verify admin status
      const tokenResult = await result.user.getIdTokenResult();
      const hasAdminClaim = tokenResult.claims.admin === true;
      
      const userDoc = await getDoc(doc(db, 'admins', result.user.uid));
      const isAdminInFirestore = userDoc.exists() && userDoc.data()?.isAdmin === true;
      
      if (!hasAdminClaim && !isAdminInFirestore) {
        await firebaseSignOut(auth);
        throw new Error('אין לך הרשאות גישה לאזור הניהול');
      }
      
      return result.user;
    } catch (err) {
      const errorMessages = {
        'auth/invalid-credential': 'אימייל או סיסמה שגויים',
        'auth/user-not-found': 'משתמש לא נמצא',
        'auth/wrong-password': 'סיסמה שגויה',
        'auth/too-many-requests': 'יותר מדי ניסיונות. נסה שוב מאוחר יותר',
        'auth/user-disabled': 'חשבון זה הושבת'
      };
      const message = errorMessages[err.code] || err.message;
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      const errorMessages = {
        'auth/user-not-found': 'משתמש עם אימייל זה לא נמצא',
        'auth/invalid-email': 'כתובת אימייל לא תקינה'
      };
      throw new Error(errorMessages[err.code] || err.message);
    }
  };

  const value = {
    user,
    isAdmin,
    loading,
    error,
    signIn,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;
