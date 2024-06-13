import { useEffect, useState } from "react";
import { fetchPaginatedArticles} from "@/utils/requestHelper";
import rssArticleLibrarian from "../assets/rssArticleLibrarian.webp"

import ArticleList from "@/components/ArticleList";

const MyArticles = () => {

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

    return (
        <div>
            <div className={`flex flex-col items-center justify-center mt-5 text-gray-900`}>
                <img src={rssArticleLibrarian} alt="Our Rss Article Lirarian"
                 content={"Content credentials: Generated with AI ∙ 4 June 2024 at 15:36 pm"} className="mb-4 size-72"/>
            </div>
            <div>
                {buttonActive ?  <ArticleList articles={articles} loadMore={loadMore}/> : <></> }
            </div>
        </div>
    );
};

export default MyArticles;