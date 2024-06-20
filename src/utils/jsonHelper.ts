/**
 * Project: RssFrontend
 * Created by: eibmac20
 * Date: 24.05.24
 */
export function parseRssItem(json: RssItem): RssItem {
    return {
        ...json,
        pubDate: new Date(json.pubDate),
    };
}