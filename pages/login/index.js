import { useState } from "react";

import { supabase } from '../../util/supabaseClient'

export default function Signin() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    async function signIn() {
        if (!email) return
        const { data, error } = await supabase.auth.signInWithOtp({
            email,
        })
        if (error) {
            console.log({ error })
        } else {
            setSubmitted(true)
        }
    }

    if (submitted) {
        return (
            <div>
                <h1>
                    Please check your email to signIn
                </h1>
            </div>
        )
    }

    return (
        <div>
            <main>
                <h1>
                    Sign In
                </h1>
                <input onChange={e => setEmail(e.target.value)} style={{ margin:10 }} />
                <button onClick={() => signIn()}>Sign In</button>
            </main>
        </div>
    )   
} 