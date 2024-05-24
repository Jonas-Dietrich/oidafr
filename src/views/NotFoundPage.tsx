import rss404Image from '../assets/rss404.jpg';
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center sm:mt-52 mt-5 text-center p-4">
            <img src={rss404Image} alt="404 error Content credentials: Generated with AI ∙ 24 May 2024 at 2:05 pm" className="mb-4 h-52 rounded-xl"/>
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-2xl">Oops! The page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 text-blue-500 hover:underline">Go back to Home</Link>
        </div>
    );
};

export default NotFoundPage;