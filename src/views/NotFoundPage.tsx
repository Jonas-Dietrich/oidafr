import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-2xl">Oops! The page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 text-blue-500 hover:underline">Go back to Home</Link>
        </div>
    );
};

export default NotFoundPage;