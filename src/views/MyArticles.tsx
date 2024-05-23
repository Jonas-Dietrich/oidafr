import { useEffect, useState } from "react";
import { fetchUserArticles } from "@/utils/requestHelper";
import ArticleList from "@/components/ArticleList";

const MyArticles = () => {

    const [articles, setArticles] = useState<RssItem[]>([]);

    useEffect(() => {
        fetchUserArticles().then(setArticles);
    });

    return (
        <div>
            <h1>My Feeds</h1>
            <div>
                <ArticleList articles={articles}/>
            </div>
        </div>
    );
};

export default MyArticles;