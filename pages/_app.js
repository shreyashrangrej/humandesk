import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient'
import { useRouter } from 'next/router'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
      <Component {...pageProps} />
  )
}

export default MyApp
