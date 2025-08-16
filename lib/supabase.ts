import { createClient } from '@supabase/supabase-js'
import { auth } from "@clerk/nextjs/server"

export const createsupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables not configured')
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })
}// Temporary test route (app/api/test/route.ts)


export async function GET() {
  const supabase = createsupabaseClient();
  const { data, error } = await supabase.from('companions').select('*').limit(1);
  return Response.json({ 
    connected: !error, 
    error,
    env: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 25) + '...',
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 5) + '...'
    }
  });
}