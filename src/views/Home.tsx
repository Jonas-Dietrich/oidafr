import rssImage from '../assets/rssMascot.webp';
import React, {useEffect, useState} from "react";
import {getSupabaseSession} from "@/utils/supabaseUtils.ts";

interface HomeProps {
    session: object | null
}

/**
 * Project: RssFrontend
 * Created by: eibmac20
 * Date: 03.05.24
 */
const Home: React.FC<HomeProps> = ({session}) => {
    const [userName, setUserName] = useState<string | null>(null);

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
        <div className={`flex flex-col items-center justify-center py-5 divFullHeight text-gray-900`}>
            <img src={rssImage} alt="RSS main mascot (he is very friendly and happy)"
                 content={"Content credentials: Generated with AI ∙ 24 May 2024 at 6:55 pm"} className="mb-4 size-52"/>
            <h1 className="text-5xl font-bold mb-4">Welcome to our RSS application!</h1>
            {userName && <h2 className="text-2xl font-bold mb-4">Hi, {userName}! 👋</h2>}
            <p className="text-lg mb-8">Stay updated with the latest news from your favorite websites.</p>
            {session && <div className="flex">
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
                <a href="/top-channels"
                   className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">
                    Find your next channel
                </a>
            </div>}
            {!session &&
                <div className={"flex"}>
                    <a href="/login"
                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
                        Log in or sign up
                    </a>
                    <a href="/about"
                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
                        Learn about us
                    </a>
                    <a href="/top-channels"
                       className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">
                        Explore our top channels
                    </a>
                </div>
            }
        </div>
    );
};

export default Home;