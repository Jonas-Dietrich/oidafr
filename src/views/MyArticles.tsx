import { useEffect, useState } from "react";
import rssArticleLibrarian from "../assets/rssArticleLibrarian.webp"

import ArticleList from "@/components/ArticleList";
import { fetchUserFeeds } from "@/utils/requestHelper";

/**
 * Project: RssFrontend
 * Created by: diejoc20
 * Date: 16.05.24
 */
const MyArticles = () => {

    const [articleUrls, setArticleUrls] = useState<string[]>([]);

    useEffect(() => {
        fetchUserFeeds().then(setArticleUrls);
    }, []);

    return (
        <div>
            <div className={`flex flex-col items-center justify-center mt-5 text-gray-900`}>
                <img src={rssArticleLibrarian} alt="Our Rss Article Lirarian"
                 content={"Content credentials: Generated with AI ∙ 4 June 2024 at 15:36 pm"} className="mb-4 size-72"/>
            </div>
            <div>
                <ArticleList articleUrls={articleUrls}/>
            </div>
        </div>
    );
};

export default MyArticles;