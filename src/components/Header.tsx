import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import rssImage from '../assets/rssFaviconLogo.webp';
import supabase from "@/utils/supabase.tsx";
import {useToast} from "@/components/ui/use-toast.ts";

interface HeaderProps {
    session?: object | null
}

const Header: React.FC<HeaderProps> = ({session = null}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const {toast} = useToast();

    const handleSignOff = () => {
        supabase.auth.signOut()
            .then(() => nav("/login"))
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: `There has been an error signing you off`,
                    description: "Please try again later or delete your cookies manually.",
                })
            })
    }

    const nav = useNavigate();

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-2">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">
                    <Link to="/">
                        <img src={rssImage} alt="RSS logo" className="inline-block align-middle w-auto h-10 mr-2"/>
                    </Link>
                </span>
                <h1 className="text-2xl font-bold">RSSFeed</h1>
            </div>
            <div className="block lg:hidden">
                <button onClick={toggleMenu}
                        className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div
                className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'} lg:block`}>
                <div className="text-sm lg:flex-grow">
                    <Link to="/"
                          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Home
                    </Link>
                    <Link to="/about"
                          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        About us
                    </Link>
                    {session &&
                        <>
                            <Link to="/account"
                                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                                My account
                            </Link>
                            <Link to="/my-feeds"
                                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                                My feeds
                            </Link>
                            <Link to="/my-articles"
                                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                                My Articles
                            </Link>
                        </>
                    }
                </div>
                <div>
                    {
                        session ?
                            <button
                                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                                onClick={() => handleSignOff()}>Sign off
                            </button>
                            :
                            <button
                                className="inline-block text-sm px-4 py-2 leading-none border rounded border-transparent text-teal-500 bg-white hover:text-blue-950 hover:bg-transparent hover:border-white mt-4 lg:mt-0"
                                onClick={() => nav("/login")}>Sign in
                            </button>

                    }
                </div>
            </div>
        </nav>
    );
}

export default Header;