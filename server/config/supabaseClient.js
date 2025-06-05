import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dwlenzcizzxeidcckyvu.supabase.co';  // Replace with your project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3bGVuemNpenp4ZWlkY2NreXZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTAzMTY3MiwiZXhwIjoyMDY0NjA3NjcyfQ.yPkLT9oPv7d6lk1YdWzJgPGA45Ve-lufznM-DnqIOBk';                 // Use your secret service role key

export const supabase = createClient(supabaseUrl, supabaseKey);
