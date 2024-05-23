import supabase from "@/utils/supabase";
import { Link } from "react-router-dom";

const Header = () => {
    return (<nav>
        <Link to="/">Home</Link>
        <Link to="/account">My account</Link>
        <Link to="/my-feeds">My feeds</Link>
        <Link to="/my-articles">My Articles</Link>
        <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"} onClick={() => supabase.auth.signOut()}>Sign off</button>
    </nav>);
}
 
export default Header;