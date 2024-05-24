import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getItemById} from "@/utils/requestHelper.ts";
import RssItemItem from "@/components/RssItemItem.tsx";
import FeedListItem from "@/components/FeedListItem.tsx";
import NotFoundPage from "@/views/NotFoundPage.tsx";

const ArticleDetails = () => {
    const {item_id} = useParams();
    const [item, setItem] = useState<RssItem | null>(null);
    const [httpStatus, setHttpStatus] = useState<number | null>(null);

    const fetchArticle = async () => {
        if (item_id && !isNaN(+item_id)) {
            getItemById(+item_id).then(r => setItem(r.data)).catch(e => setHttpStatus(e.response.status));
        }
        else {
            setHttpStatus(404)
        }
    }

    useEffect(() => {
        fetchArticle().then(() => console.log("fetchArticle executed"));
    }, [item_id]);

    return (
        <div>
            {item && <RssItemItem item={item}></RssItemItem>}
            {item && <FeedListItem feed={item.rssChannel}/>}
            {httpStatus === 404 && <NotFoundPage/>}
        </div>
    );
};

export default ArticleDetails;