import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getItemById} from "@/utils/requestHelper.ts";
import RssItemItem from "@/components/RssItemItem.tsx";
import FeedListItem from "@/components/FeedListItem.tsx";
import NotFoundPage from "@/views/NotFoundPage.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import ArticleDetailsCard from "@/components/ArticleDetailsCard.tsx";
import {parseRssItem} from "@/utils/jsonHelper.ts";

const beUrl = import.meta.env.VITE_BACKEND_URL as string;

/**
 * Project: RssFrontend
 * Created by: eibmac20
 * Date: 24.05.24
 */
const ArticleDetails = () => {
    const {item_id} = useParams();
    const [item, setItem] = useState<RssItem | null>(null);
    const [httpStatus, setHttpStatus] = useState<number | null>(null);

    const {toast} = useToast();

    useEffect(() => {
        const fetchArticle = async () => {
            if (item_id) {
                if (!isNaN(+item_id)) {
                    getItemById(+item_id).then(r => setItem(parseRssItem(r.data))).catch(e => {
                        toast({
                            variant: "destructive",
                            title: `The requested item with id ${item_id} was not found.`,
                            description: "Please provide a valid item id.",
                        })
                        setHttpStatus(e.response.status)
                    });
                } else {
                    toast({
                        variant: "destructive",
                        title: `The id of the requested item (${item_id}) is not a number`,
                        description: "Please provide a valid item id.",
                    })
                    console.log("inv")
                    setHttpStatus(404)
                }
            }
        }

        fetchArticle().then(() => console.log("fetchArticle executed"));
    }, [toast, item_id]);

    return (
        <div className={"p-10"}>
            {item && <ArticleDetailsCard rssItem={item} isChannelTrustWorthy={item.rssChannel.feedUrl !== beUrl}/>}
            {item && <RssItemItem item={item}></RssItemItem>}
            {item && <FeedListItem feed={item.rssChannel} removeFeed={undefined}/>}
            {httpStatus === 404 && <NotFoundPage errorText={"Oops! The article you are looking for does not exist."}/>}
        </div>
    );
};

export default ArticleDetails;