interface IApiAboutStats {
    channelCount: number;
    commentCount: number;
    itemCount: number;
    categoryCount: number;
    sourceCount: number;
    enclosureUrlCount: number;
}

interface ITopChannel {
    rssChannel: RssChannel;
    count: number;
    copied?: boolean;
}