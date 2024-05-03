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
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-5">
                <img src="/rss-41072_1280.png" alt="RSS Icon" className="w-32 h-32 mb-10"/>
                <h3 className="text-2xl font-bold text-gray-900">Welcome to Really-Sophisticated-Story-Feed!</h3>
                <h4 className="text-xl text-gray-700">Your personal RSS-feed</h4>
                <hr className="my-4"/>
                <Auth providers={[]} supabaseClient={supabase} appearance={{theme: ThemeSupa}}/>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-5">
                <img src="/rss-41072_1280.png" alt="RSS Icon" className="w-32 h-32 mb-10"/>
                <p className="text-xl text-gray-700">Logged in!</p>
                <button onClick={() => supabase.auth.signOut()} className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">Sign out</button>
            </div>
        )
    }
}

export default App
