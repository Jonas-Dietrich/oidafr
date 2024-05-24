import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {getItemById} from "@/utils/requestHelper.ts";
import RssItemItem from "@/components/RssItemItem.tsx";
import FeedListItem from "@/components/FeedListItem.tsx";
import NotFoundPage from "@/views/NotFoundPage.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";

const ArticleDetails = () => {
    const {item_id} = useParams();
    const [item, setItem] = useState<RssItem | null>(null);
    const [httpStatus, setHttpStatus] = useState<number | null>(null);

    const {toast} = useToast();

    const fetchArticle = useCallback(async () => {
        if (item_id && !isNaN(+item_id)) {
            getItemById(+item_id).then(r => setItem(r.data)).catch(e => {
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
    }, [item_id, toast]);

    useEffect(() => {
        fetchArticle().then(() => console.log("fetchArticle executed"));
    }, [fetchArticle]);

    return (
        <div>
            {item && <RssItemItem item={item}></RssItemItem>}
            {item && <FeedListItem feed={item.rssChannel}/>}
            {httpStatus === 404 && <NotFoundPage/>}
            <Toaster/>
        </div>
    );
};

export default ArticleDetails;