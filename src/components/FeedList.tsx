import {useEffect, useState} from "react";
import "../types/rssDatatypes.d.ts";
import FeedListItem from "./FeedListItem";
import { fetchBackendFeeds, removeTheFeed } from "@/utils/requestHelper.ts";

/**
 * Project: RssFrontend
 * Created by: eibmac20
 * Date: 3. 5. 2024
 */

const FeedList = () => {

    const [feedCus, setFeedCus] = useState<RssChannel[]>([]);
    
    useEffect(() => {
        fetchBackendFeeds().then(setFeedCus) 
    }, []);

    const removeFeed = (url:string) => {
        removeTheFeed(url);

        const rmvidx = feedCus.findIndex(e => e.feedUrl === url);
        feedCus.splice(rmvidx, 1);

        setFeedCus([...feedCus]);
    }

    return (
        <div>
            <div className="flex flex-col">
                {
                    feedCus.map((feed, idx) => <FeedListItem key={idx} feed={feed} removeFeed={removeFeed}/>)  
                }
            </div>
        </div>
    );
};

export default FeedList;