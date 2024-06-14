import RssItemItem from "./RssItemItem";

interface ArticleListProps {
    articles: RssItem[], 
}

const ArticleList:React.FC<ArticleListProps> = ({articles}) => {

    return (<div>
        {
            articles.map((item: RssItem) =>
                <RssItemItem item={item} key={item.item_id}/>
            )
        }
    </div>);
}
 
export default ArticleList;