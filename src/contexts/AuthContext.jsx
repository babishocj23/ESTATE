import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        setUser(session?.user ?? null);
        
        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        });

        return () => {
          if (subscription) subscription.unsubscribe();
        };
      } catch (e) {
        console.error('Auth error:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  const signUp = async ({ email, password, ...metadata }) => {
    try {
      setError(null);
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...metadata,
            email_confirmed: false
          }
        }
      });

      if (signUpError) throw signUpError;
      return { data, error: null };
    } catch (e) {
      console.error('SignUp error:', e);
      setError(e.message);
      return { data: null, error: e };
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      setError(null);
      const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;
      return { session, error: null };
    } catch (e) {
      console.error('SignIn error:', e);
      setError(e.message);
      return { session: null, error: e };
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
    } catch (e) {
      console.error('SignOut error:', e);
      setError(e.message);
      throw e;
    }
  };

  const value = {
    signUp,
    signIn,
    signOut,
    user,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 