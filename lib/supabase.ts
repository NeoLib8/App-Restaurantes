import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ffvgnzhonjmxmzhzriff.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdmduemhvbmpteG16aHpyaWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDM2MzgsImV4cCI6MjA2OTg3OTYzOH0.WU834fwt8g3kAummUf5qbotnq2_xsFpt0v0ZiMEGgCc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
