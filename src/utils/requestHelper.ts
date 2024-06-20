import supabase from "./supabase";
import axios from "axios";

const beUrl = import.meta.env.VITE_BACKEND_URL as string;

export const fetchUserFeeds = async ():Promise<string[]> => {
    const { data: user_feeds, error } = await supabase
        .from('user_feeds')
        .select('feedUrl')
        .is("invalid_since", null);

    console.log(user_feeds);

    if (error) alert(error.message)
    if (user_feeds) return user_feeds.map(d => d.feedUrl);

    return [];
}

export const fetchBackendFeeds = async () => {

    const userFeeds = await fetchUserFeeds();
        
    const requestUrl = beUrl.concat(`/feed-list?urls=${encodeURIComponent(userFeeds?.join(","))}`);

    const {data, status} = await axios.get<RssChannel[]>(requestUrl);

    if (status != 200) console.log("########################## ERRROR")
    
    return data
}

export const fetchUserArticles = async ():Promise<RssItem[]> => {
    const userFeeds = await fetchUserFeeds();
    const retVal = fetchUserArticlesByUrls(userFeeds);
    return retVal;
}

export const fetchUserArticlesByUrls = async (urls: string[]):Promise<RssItem[]> => {
    const requestUrl = beUrl.concat(`/item-list?urls=${encodeURIComponent(urls.join(','))}`);

    const {data, status} = await axios.get<RssItem[]>(requestUrl);

    if (status != 200) console.log("########################## ERRROR fetching feed fetching feedss")
        
    return data;
}

export const fetchPaginatedArticles = async (pageNo: number, pageSize: number) => {
    const userFeeds = await fetchUserFeeds();
        
    const data = fetchPaginatedArticlesByUrl(userFeeds, pageNo, pageSize);
    return data;
}

export const fetchPaginatedArticlesByUrl = async (urls: string[], pageNo: number, pageSize: number) => {
    const requestUrl = beUrl.concat(`/item-list/pages?pageSize=${encodeURIComponent(pageSize)}&pageNo=${encodeURIComponent(pageNo)}&urls=${encodeURIComponent(urls.join(","))}&asc=false`)
    const {data, status} = await axios.get<ItemPageable>(requestUrl);

    if (status != 200) console.log("########################## ERRROR fetching paginated articles")

    return data;
}

export const postUserComment = async (title: string, link: string, description: string, author: string) => {
    return await axios.post(`${beUrl}/comments`, {
        title,
        link,
        description,
        author,
    });
}

export const getUserComments = async (after: string) => {
    const {data, status} = await axios.get<UserComment[]>(`${beUrl}/comments/${encodeURIComponent(after)}`);

    if (status != 200) console.log("###################### ERROR")

    return data
}

export const getPaginatedUserComments = async (pageNo: number) => {
    const {data, status} = await axios.get<UserCommentPageable>(`${beUrl}/comments/pages?pageSize=3&pageNo=${encodeURIComponent(pageNo)}`);

    if (status != 200) console.log("###################### ERROR")

    return data
}

export const isFeedVaild = async (url: string)  => {
    const {status} = await axios.post(`${beUrl}/feed-list?url=${encodeURIComponent(url)}`).catch(e => {
        throw new Error("Invalid feed url!");
    })

    const userFeeds = await fetchUserFeeds(); 
    if (userFeeds.find(e => e === url)) throw new Error("You already added this feed to your personal feed list!");
}

export const addTheFeedFr = async (url:string) => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    
    const {error} = await supabase
        .from("user_feeds")
        .upsert({user_id: userId, feedUrl: url, invalid_since: null})

    if (error) throw new Error(error.message);
}

export const removeTheFeed = async (url:string) => {
    const { error, status} = await supabase
        .from('user_feeds')
        .update({invalid_since: ((new Date()).toISOString())})
        .eq("feedUrl", url);

    console.log(status);

    if (error) throw new Error(error.message);
}

export const getItemById = async (item_id: number) => {
    return await axios.get<RssItem>(`${beUrl}/item-list/${item_id}`);
}

export const fetchChannelByUrl = async (feed_url: string):Promise<RssChannel> => {
    const allChannels = await fetchBackendFeeds();
    const possiblyTheChannelIAmLookingFor = allChannels.find((channel) => channel.feedUrl === feed_url)

    if (possiblyTheChannelIAmLookingFor) return possiblyTheChannelIAmLookingFor; 
    else throw Error("The requested Channel does not exist.");
}