import ArticleList from "./ArticleList";

interface ChannelDetailsProps {
    channel: RssChannel
}

const ChannelDetails:React.FC<ChannelDetailsProps> = ({channel}) => {
    return (<>
        <div>
            <p>{channel.title}</p>
            <p>{channel.feedUrl}</p>
            <p>{channel.description}</p>
        </div> 
        <div>
            <ArticleList articleUrls={[channel.link]}/>
        </div>
    </>);
}
 
export default ChannelDetails;