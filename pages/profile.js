import { useState, useEffect } from "react";
import { supabase } from "../util/supabaseClient";
import { useRouter } from "next/router";

export default function Profile() {
    const [profile, setProfile] = useState(null)
    const router = useRouter()

    useEffect(() =>{
        fetchProfile()
    }, [])

    async function fetchProfile() {
        const profileData = await supabase.auth.getUser()
        if(!profileData) {
            router.push('/signin')
        } else {
            setProfile(profileData)
        }
    }

    async function signOut() {
        await supabase.auth.signOut()
        router.push('/signin')
    }

    if (!profile) return null
    return( 
        <div style={{ maxWidth: '420px', margin: '96px auto' }}>
            <h1>
                Hello, {profile.email}
            </h1>
            <p>
                User ID: {profile.id}
            </p>
            <button onClick={signOut}>
                Sign Out
            </button>
        </div>
    )
}