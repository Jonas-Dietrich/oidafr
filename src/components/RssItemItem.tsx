import {shorten} from "../utils/generalHelper"

/**
 * Project: RssFrontend
 * Created by: diejoc20
 * Date: 17. 5. 2024
 */

interface RssItemItemProps {
    item: RssItem
}


const RssItemItem:React.FC<RssItemItemProps> = ({item}) => {
    return (<div className="border-2 border-teal-500 border-solid mb-4 rounded-md m-3">
        <div className="p-3">
            <a className="text-lg font-medium" href={`/my-articles/${item.itemId}`} target="_blank" rel="noreferrer noopener">{item.title}</a>
            <div className="pl-3">
                <p className="italic">{item.rssChannel?.title}</p>
                <p>{shorten(item.description)}</p>
            </div>
        </div>
    </div>);
}
 
export default RssItemItem;