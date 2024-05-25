import rss404Image from '../assets/rss404.jpg';
import {Link} from "react-router-dom";
import React from "react";

interface NotFoundPageProps {
    errorText?: string,
    linkUrl?: string,
    linkText?: string
}

const NotFoundPage: React.FC<NotFoundPageProps> = (
    {
        errorText = "Oops! The page you are looking for does not exist.",
        linkUrl = "/",
        linkText = "Go back to Home"
    }) => {
    return (
        <div className="flex flex-col items-center justify-center lg:mt-48 mt-5 text-center p-4">
            <div className="overflow-hidden h-52 w-auto rounded-xl mb-10">
                <a href="https://http.cat/status/404" target="_blank" rel="noopener noreferrer"
                   style={{cursor: 'default'}}>
                    <img src={rss404Image} alt="Our 404 - the saddest one (nobody likes errors)"
                         content={"Content credentials: Generated with AI ∙ 24 May 2024 at 2:05 pm"}
                         className="h-full w-full object-cover rounded-xl transform transition-all duration-300 hover:scale-110"/>
                </a>
            </div>
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-2xl">{errorText}</p>
            <Link to={linkUrl} className="mt-6 text-blue-500 hover:underline">{linkText}</Link>
        </div>
    );
};

export default NotFoundPage;