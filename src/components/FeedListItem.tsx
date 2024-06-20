import { Button } from "./ui/button";

interface FeedListItemProps {
    feed: RssChannel,
    removeFeed: (url: string) => void,
}

const FeedListItem: React.FC<FeedListItemProps> = ({ feed, removeFeed }) => {
    return (<div key={feed.channel_id} className="border-teal-500 border-solid border-2 max-w-m p-5 m-4 flex flex-row rounded-lg">
        <div className="mr-4 min-w-24">
            {feed.rssImage == null ? <img src="https://cdn4.iconfinder.com/data/icons/picture-sharing-sites/32/No_Image-1024.png" className="max-h-20" ></img> : <img src={feed.rssImage.url} width={feed.rssImage.width} height={feed.rssImage.height} className="rounded"></img>}
        </div>
        <div className="flex justify-between w-full">
            <div >
                <a className="text-xl font-semibold" href={feed.link}>{feed.title}</a>
                <p className="text-lg">{!feed.description ? "Der Name ist hier Programm!" : feed.description}</p>
            </div>
            <Button className="order-last inline-block align-middle" onClick={() => removeFeed(feed.feedUrl)}>Remove</Button>
        </div>
    </div>);
}

export default FeedListItem;