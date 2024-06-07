interface RssChannel {
    feedUrl: string, 
    channel_id: number, 
    title: string, 
    link: string, 
    description: string, 
//  lastBuildDate: TO FIGURE OUT LATER
    rssImage: RssImage, 
    rssItems: RssItem[], 
    category: RssCategory,
    copyright: string,
    docs: string,
    generator: string,
    language: string,
    managingEditor: string,
    rating: string,
    webMaster: string,
}

interface RssImage {
    image_id: number,
    url: string,
    link: string,
    description: string,
    height: number,
    width: number,
    title: string,
}

interface RssItem {

    item_id: number,

    title: string,
    link: string,
    description: string,

    enclosureURL: RssEnclosureURL,

//  private LocalDateTime pubDate TO WORRY BOUT LATRER
    pubDate: Date,

    category: RssCategory,

    author: string,
    comments: string,
    guid: string,

    source: RssSource,

    rssChannel: RssChannel
}
    
interface RssCategory {
    categoryId: number, 
    categoryName: string, 
    domain: string    
}

interface RssEnclosureURL {
    url_id: number,
    url: string,
    length: string,
    type: string,
}

interface RssSource {
    sourceId: number,
    sourceName: string,
    url: string,
}

interface ItemPageable {
    content: RssItem[], 
    pageable: {
        pageNumber: number, 
        pageSize: number,
        totalPages: number, 
        
    }
}