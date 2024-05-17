import {useEffect, useState} from "react";
import supabase from "@/utils/supabase.tsx";
import "../types/rssDatatypes.d.ts";
import FeedListItem from "./FeedListItem";
import axios from "axios";

const FeedList = () => {
    const beUrl = import.meta.env.VITE_BACKEND_URL as string;

    const [userFeeds, setUserFeeds] = useState<string[] | null>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [feedCus, setFeedCus] = useState<RssChannel[]>([]);
    
    const fetchUserFeeds = async () => {
        const { data: user_feeds, error } = await supabase
            .from('user_feeds')
            .select('feedUrl')

        if (error) setErrorMsg(error.message)
        if (user_feeds) setUserFeeds(user_feeds.map(d => d.feedUrl));

    }

    const fetchBackendFeeds = async () => {
        
        const requestUrl = beUrl.concat(`/feed-list?urls=${userFeeds?.join(",")}`);

        const {data, status} = await axios.get<RssChannel[]>(requestUrl);

        if (status != 200) console.log("########################## ERRROR")
        
        setFeedCus(data);
    }

    useEffect(() => {
        fetchUserFeeds().then(
            () => {
                fetchBackendFeeds();
            }
        );
    }, []);

    return (
        <div>
            <h1>Feedlist</h1>
            <h2>{errorMsg}</h2>
                {
                    feedCus.map((feed) => <FeedListItem key={feed.channel_id} feed={feed}/>)  
                }
        </div>
    );
};

export default FeedList;