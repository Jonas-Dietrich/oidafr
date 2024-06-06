interface RssItemItemProps {
    item: RssItem
}

const shorten = (toShorten: string):string => {
    if (toShorten.length >= 300) {
        return toShorten.slice(0, 301) + "...";
    }

    return toShorten;
}

const RssItemItem:React.FC<RssItemItemProps> = ({item}) => {
    return (<div className="border-2 border-teal-500 border-solid mb-4 rounded-md m-3">
        <div className="p-3">
            <a className="text-lg font-medium" href={item.link}>{item.title}</a>
            <div className="pl-3">
                <p className="italic">{item.rssChannel.title}</p>
                <p>{shorten(item.description)}</p>
            </div>
        </div>
    </div>);
}
 
export default RssItemItem;