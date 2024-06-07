import { useEffect, useState } from "react";
import { fetchPaginatedArticles, fetchUserArticles } from "@/utils/requestHelper";
import ArticleList from "@/components/ArticleList";

const MyArticles = () => {

    const [articles, setArticles] = useState<RssItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        fetchPaginatedArticles(currentPage, 10).then((data:ItemPageable) => setArticles(data.content));
    }, []);

    const loadMore = () => {
        setCurrentPage(currentPage + 1);

        fetchPaginatedArticles(currentPage, 10).then((data:ItemPageable) => {
            const currArticles = {...articles}
            currArticles.push(...data.content);

            console.log(currArticles);

            setArticles(currArticles);
        })
    }

    return (
        <div>
            <h1>My Feeds</h1>
            <div>
                <ArticleList articles={articles} loadMore={loadMore}/>
            </div>
        </div>
    );
};

export default MyArticles;