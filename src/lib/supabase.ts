import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://yaflexlocwmhocjfrpov.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZmxleGxvY3dtaG9jamZycG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMDY0MTksImV4cCI6MjA4MDc4MjQxOX0.NB_KocoDo8HX3B0hRJuLF-exBdaKmMo--JNbSgqEOXk";


export const supabase = createClient(supabaseUrl, supabaseAnonKey)
