import RssItemItem from "./RssItemItem";
import { Button } from "./ui/button";

interface ArticleListProps {
    articles: RssItem[], 
    loadMore: () => void
}

const ArticleList:React.FC<ArticleListProps> = ({articles, loadMore}) => {


    return (<div>
        <h1>Amazing List of RSS items!</h1>

        {
            articles.map((item: RssItem) =>
                <RssItemItem item={item}/>
            )
        }
        <Button variant="outline" onClick={loadMore}>Load More</Button>
    </div>);
}
 
export default ArticleList;