import { useEffect, useState } from "react";
import RssItemItem from "./RssItemItem";
import { Button } from "./ui/button";
import { fetchPaginatedArticles, } from "@/utils/requestHelper";
import Loading from "@/components/Loading.tsx";


/**
 * Project: RssFrontend
 * Created by: diejoc20
 * Date: 23. 5. 2024
 */


const ArticleList = () => {

    const [articles, setArticles] = useState<RssItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [buttonActive, setButtonActive] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchPaginatedArticles(currentPage, 20).then((data:ItemPageable) => setArticles(data.content));
    }, []);

    const loadMore = () => {
        console.log(isLoading);
        setCurrentPage(currentPage + 1);

        fetchPaginatedArticles(currentPage, 20).then((data:ItemPageable) => {
            setArticles([...articles, ...data.content]);

            if (currentPage + 1 >= data.pageable.totalPages) setButtonActive(false);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        })
    }
    

    return (<div>
        {
            articles.map((item: RssItem, idx) =>
                <RssItemItem item={item} key={idx}/>
            )
        }

        <div className="flex flex-col items-center justify-center mb-4">
            {isLoading ? <div className="m-5"><Loading/></div> : <></>}
            { buttonActive ? <Button variant="default" onClick={() => {loadMore(); setIsLoading(true)}}>Load More</Button> : <></> }
        </div>
    </div>);
}
 
export default ArticleList;