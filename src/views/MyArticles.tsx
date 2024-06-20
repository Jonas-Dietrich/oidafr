import rssArticleLibrarian from "../assets/rssArticleLibrarian.webp"
import ArticleList from "@/components/ArticleList";

/**
 * Project: RssFrontend
 * Created by: diejoc20
 * Date: 16.05.24
 */
const MyArticles = () => {
    return (
        <div>
            <div className={`flex flex-col items-center justify-center mt-5 text-gray-900`}>
                <img src={rssArticleLibrarian} alt="Our Rss Article Lirarian"
                 content={"Content credentials: Generated with AI ∙ 4 June 2024 at 15:36 pm"} className="mb-4 size-72"/>
            </div>
            <div>
                <ArticleList />
            </div>
        </div>
    );
};

export default MyArticles;