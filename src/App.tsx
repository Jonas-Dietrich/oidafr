import {useEffect, useState} from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from "./utils/supabase.tsx";
import AccountManagement from "./views/AccountManagement.tsx";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./views/Home.tsx";
import PasswordReset from "./views/PasswordReset.tsx";
import "./App.css"
import MyFeeds from "@/views/MyFeeds.tsx";
import ArticleList from './components/ArticleList.tsx';
import MyArticles from './views/MyArticles.tsx';
import Header from './components/Header.tsx';

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
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/account" element={<AccountManagement />} />
                    <Route path="/my-feeds" element={<MyFeeds/>}/>
                    <Route path="/my-articles" element={<MyArticles/>} />
                    <Route path="/account-recovery" element={<PasswordReset />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;