import {Auth} from "@supabase/auth-ui-react";
import supabase from "@/utils/supabase.tsx";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

interface LoginProps {
    session: object | null
}

const Login:React.FC<LoginProps> = ({session}) => {
    const nav = useNavigate();

    useEffect(() => {
        if (session) nav("/")
    }, [session, nav])

    return (
        <div className="flex flex-col items-center justify-center pt-5 divFullHeight text-gray-900">
            <img src="/rss-41072_1280.png" alt="RSS Icon" className="w-32 h-32 mb-10"/>
            <h3 className="text-2xl font-bold text-gray-900">Welcome to Really-Sophisticated-Story-Feed!</h3>
            <h4 className="text-xl text-gray-700">Your personal RSS-feed</h4>
            <hr className="my-4"/>
            <Auth providers={[]} supabaseClient={supabase} appearance={{theme: ThemeSupa}}/>
        </div>
    );
};

export default Login;