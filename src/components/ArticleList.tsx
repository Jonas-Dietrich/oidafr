import { useEffect, useState } from "react";
import RssItemItem from "./RssItemItem";
import { Button } from "./ui/button";
import { fetchPaginatedArticles, fetchPaginatedArticlesByUrl} from "@/utils/requestHelper";

interface ArticleListProps {
    articleUrls: string[], 
}

const ArticleList:React.FC<ArticleListProps> = ({articleUrls}) => {

    const [articles, setArticles] = useState<RssItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [buttonActive, setButtonActive] = useState<boolean>(true);

    useEffect(() => {
        fetchPaginatedArticlesByUrl(articleUrls, currentPage, 20).then((data:ItemPageable) => setArticles(data.content));
    }, []);

    const loadMore = () => {
        setCurrentPage(currentPage + 1);

        fetchPaginatedArticles(currentPage, 20).then((data:ItemPageable) => {
            setArticles([...articles, ...data.content]);

            if (currentPage + 1 >= data.pageable.totalPages) setButtonActive(false);
        })
    }
    

    return (<div>
        {
            articles.map((item: RssItem, idx) =>
                <RssItemItem item={item} key={idx}/>
            )
        }

        <div className="flex flex-col items-center justify-center">
            { buttonActive ? <Button variant="default" onClick={loadMore}>Load More</Button> : <></> }
        </div>
    </div>);
}
 
export default ArticleList;