import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
  const router = useRouter()

  useEffect(() => {
    debugger;
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      debugger;
      handleAuthChange(event, session)
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
        router.push('/profile')
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated')
      }
    })
    checkUser()
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  async function handleAuthChange(event, session) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session })
    })
  }

  async function checkUser() {
    const user = await supabase.auth.getUser()

    if(user) {
      setAuthenticatedState('authenticated')
    }
  }

  return (
    
    <div>
      {/* <nav style={navStyle}>
        <Link href='/'>
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href='/profile'>
          <a style={linkStyle}>Profile</a>
        </Link>
        {
          authenticatedState === 'not-authenticated' || (
            <Link href='/login'>
              <a style={linkStyle}>Sign In</a>
            </Link>
          )
        }
        <Link href='/protected'>
        <a style={linkStyle}>Protected</a>
        </Link>
      </nav> */}
      <Component {...pageProps} />
    </div>
  )
}

const linkStyle = {
  marginRight: 10
}

const navStyle = {
  margin: 20
}

export default MyApp
