import { useEffect, useState } from "react";
import RssItemItem from "./RssItemItem";
import { Button } from "./ui/button";
import { fetchPaginatedArticles } from "@/utils/requestHelper";

interface ArticleListProps {
    articleUrls: string[], 
}

const ArticleList:React.FC<ArticleListProps> = ({articleUrls}) => {

    const [articles, setArticles] = useState<RssItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [buttonActive, setButtonActive] = useState<boolean>(true);

    useEffect(() => {
        fetchPaginatedArticles(currentPage, 30).then((data:ItemPageable) => setArticles(data.content));
    }, []);

    const loadMore = () => {
        setCurrentPage(currentPage + 1);

        fetchPaginatedArticles(currentPage, 30).then((data:ItemPageable) => {
            setArticles([...articles, ...data.content]);

            if (currentPage + 1 >= data.pageable.totalPages) setButtonActive(false);
        })
    }
    

    return (<div>
        {
            articles.map((item: RssItem) =>
                <RssItemItem item={item} key={item.item_id}/>
            )
        }


        <div>
            { buttonActive ? <Button variant="default" onClick={loadMore}>Load More</Button> : <></> }
        </div>
    </div>);
}
 
export default ArticleList;