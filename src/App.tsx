import {useEffect, useState} from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from "./utils/supabase.tsx";

function App() {
    const [session, setSession] = useState<object | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (
            <div>
                <img src="/rss-41072_1280.png" alt="RSS Icon"/>
                <h3>Welcome to Really-Sophisticated-Story-Feed!</h3>
                <h4>Your personal RSS-feed</h4>
                <hr/>
                <Auth providers={[]} supabaseClient={supabase} appearance={{theme: ThemeSupa}}/>
            </div>
        )
    } else {
        return (
            <div>
                <p>Logged in!</p>
                <button onClick={() => supabase.auth.signOut()}>Sign out</button>
            </div>
        )
    }
}

export default App
