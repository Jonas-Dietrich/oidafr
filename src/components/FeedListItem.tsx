interface FeedListItemProps {
    feed: RssChannel
}

const FeedListItem:React.FC<FeedListItemProps> = ({feed}) => {

    const styles = {
        border: '1px solid red',
    }

    return (<div key={feed.channel_id} style={styles} className="max-w-m p-5 m-4 flex flex-row rounded-lg">
        <div className="mr-4">
            {feed.rssImage == null ? <></> : <img src={feed.rssImage.url} width={feed.rssImage.width} height={feed.rssImage.height} className="rounded"></img>}
        </div>
        <div>
            <h3 className="text-xl font-semibold">{feed.title}</h3>
            <h4 className="text-lg">{feed.description}</h4>
        </div>
    </div>);
}
 
export default FeedListItem;