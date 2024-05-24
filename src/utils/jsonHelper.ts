export function parseRssItem(json: RssItem): RssItem {
    return {
        ...json,
        pubDate: new Date(json.pubDate),
    };
}