import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    "https://uhkcimfsstblsvjcxnvn.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoa2NpbWZzc3RibHN2amN4bnZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxMTA5ODAsImV4cCI6MjAzNzY4Njk4MH0.7VEgYiTiw6jEAYLtZEf8LO8cFNwHcYf_R0CAj18igIs"
);

export function useAuth() {

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    if (error) throw error;
    return data;
  };

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  };

  return { login, signUp, getCurrentUser };
}
