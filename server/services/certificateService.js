import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dbvncudpagqqyxfulueg.supabase.co';  // Replace with your project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRidm5jdWRwYWdxcXl4ZnVsdWVnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTExNjQ3MiwiZXhwIjoyMDY0NjkyNDcyfQ.cblupRWzpRQoI9CeVg-xqHWXO8Jh2xkDHQIxkHxdJSc'

const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = 'certificates';

async function getSignedUrl(fileName) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(fileName, 60 * 60); // URL valid for 1 hour

  if (error) {
    throw new Error(error.message);
  }

  return data.signedUrl;
}

// Instead of module.exports = { getPublicUrl };
export { getSignedUrl };
