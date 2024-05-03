import {useEffect, useState} from "react";
import supabase from "@/utils/supabase.tsx";
import {data} from "autoprefixer";

const FeedList = () => {
    const [feeds, setFeeds] = useState<string[]>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    
    const fetchUserFeeds = async () => {
        const { data: user_feeds, error } = await supabase
            .from('user_feeds')
            .select('feedUrl')

        if (error) setErrorMsg(error.message)
        if (data && data != null) setFeeds(user_feeds.map(d => d.feedUrl));


    }

    useEffect(() => {
        fetchUserFeeds().then();
    }, []);

    return (
        <div>
            <h1>Feedlist</h1>
            <h2>{errorMsg}</h2>
            {
                feeds.map((url, idx) => (<p key={idx}>{url}</p>))
            }
        </div>
    );
};

export default FeedList;