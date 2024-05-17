interface FeedListItemProps {
    feed: RssChannel
}

const FeedListItem:React.FC<FeedListItemProps> = ({feed}) => {

    const styles = {
        border: '1px solid red',
    }

    return (<div key={feed.channel_id} style={styles}>
            <h3>{feed.title}</h3>
            <h4>{feed.description}</h4>
            {feed.rssImage == null ? <></> : <img src={feed.rssImage.url} width={feed.rssImage.width} height={feed.rssImage.height}></img>}
        </div>);
}
 
export default FeedListItem;