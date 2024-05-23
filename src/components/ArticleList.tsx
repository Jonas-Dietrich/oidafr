import RssItemItem from "./RssItemItem";

interface ArticleListProps {
    articles: RssItem[]
}

const ArticleList:React.FC<ArticleListProps> = ({articles}) => {

    return (<div>
        <h1>Amazing List of RSS items!</h1>

        {
            articles.map((item: RssItem) =>
                <RssItemItem item={item}/>
            )
        }
    </div>);
}
 
export default ArticleList;