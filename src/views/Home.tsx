import rssImage from '../assets/rss-41072_1280.png';
import {useEffect, useState} from "react";
import {getSupabaseSession} from "@/utils/supabaseUtils.ts";

const Home = () => {
    const [ userName, setUserName] = useState<string>("");

    const loadUserName = async () => {
        getSupabaseSession().then(({data: {session}}) => {
            if (session && session.user && session.user.email) {
                const username = session.user.email.split("@")[0];
                setUserName(username);
            }
        })
    }

    useEffect(() => {
        loadUserName().then()
    }, []);

    return (
        <div className={`flex flex-col items-center justify-center sm:mt-52 mt-5 text-gray-900`}>
            <img src={rssImage} alt="RSS logo" className="mb-4 size-52"/>
            <h1 className="text-5xl font-bold mb-4">Welcome to our RSS application!</h1>
            <h2 className="text-2xl font-bold mb-4">Hi, {userName}! 👋</h2>
            <p className="text-lg mb-8">Stay updated with the latest news from your favorite websites.</p>
            <div className="flex">
                <a href="/comments/create"
                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
                    Leave us a Comment
                </a>
                <a href="/my-feeds"
                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">
                    Jump to my feeds
                </a>
                <a href="/my-articles"
                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
                    See your latest articles
                </a>
            </div>
        </div>
    );
};

export default Home;