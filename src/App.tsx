import {useEffect, useState} from 'react'
import supabase from "./utils/supabase.tsx";
import AccountManagement from "./views/AccountManagement.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home.tsx";
import PasswordReset from "./views/PasswordReset.tsx";
import "./App.css"
import MyFeeds from "@/views/MyFeeds.tsx";
import MyArticles from './views/MyArticles.tsx';
import Header from './components/Header.tsx';
import CreateComment from "@/views/CreateComment.tsx";
import NotFoundPage from "@/views/NotFoundPage.tsx";
import ArticleDetails from "@/views/ArticleDetails.tsx";
import AboutUs from "@/views/AboutUs.tsx";
import Login from "@/views/Login.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import TopChannels from "@/views/TopChannels.tsx";
import UserComments from './views/UserComments.tsx';
import ChannelDetails from './views/ChannelDetails.tsx';

function App() {
    const [session, setSession] = useState<object | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <div>
            <BrowserRouter>
                <Header session={session}/>
                <Routes>
                    <Route path="/" element={<Home session={session}/>}/>
                    <Route path="/login" element={<Login session={session}/>}/>
                    <Route path="/about" element={<AboutUs/>}/>
                    <Route path="/my-articles/:item_id" element={<ArticleDetails/>}/>
                    <Route path="/my-feeds/:channel_id" element={<ChannelDetails/>}/>
                    <Route path="/comments/view" element={<UserComments/>}/>
                    <Route path="/top-channels" element={<TopChannels session={session}/>}/>

                    {session &&
                        <>
                            <Route path="/account-recovery" element={<PasswordReset/>}/>
                            <Route path="/account" element={<AccountManagement/>}/>
                            <Route path="/my-feeds" element={<MyFeeds/>}/>
                            <Route path="/my-articles" element={<MyArticles/>}/>
                            <Route path="/comments/create" element={<CreateComment/>}/>
                        </>
                    }

                    <Route path="/my-articles/:item_id" element={<ArticleDetails/>}/>

                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster/>
        </div>
    )
}

export default App;