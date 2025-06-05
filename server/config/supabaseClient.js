import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dbvncudpagqqyxfulueg.supabase.co';  // Replace with your project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRidm5jdWRwYWdxcXl4ZnVsdWVnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTExNjQ3MiwiZXhwIjoyMDY0NjkyNDcyfQ.cblupRWzpRQoI9CeVg-xqHWXO8Jh2xkDHQIxkHxdJSc'

export const supabase = createClient(supabaseUrl, supabaseKey);
