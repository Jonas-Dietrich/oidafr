import {useEffect, useState} from "react";
import "../types/rssDatatypes.d.ts";
import FeedListItem from "./FeedListItem";
import { fetchBackendFeeds } from "@/utils/requestHelper.ts";

const FeedList = () => {

    const [feedCus, setFeedCus] = useState<RssChannel[]>([]);
    
    useEffect(() => {
        fetchBackendFeeds().then(setFeedCus) 
    }, []);

    return (
        <div>
            <div className="flex flex-col">
                {
                    feedCus.map((feed) => <FeedListItem key={feed.channel_id} feed={feed}/>)  
                }
            </div>
        </div>
    );
};

export default FeedList;