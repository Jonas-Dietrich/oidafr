import supabase from "./supabase";
import axios from "axios";

const beUrl = import.meta.env.VITE_BACKEND_URL as string;

export const fetchUserFeeds = async ():Promise<string[]> => {
    const { data: user_feeds, error } = await supabase
        .from('user_feeds')
        .select('feedUrl')

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

    const requestUrl = beUrl.concat(`/item-list?urls=${encodeURIComponent(userFeeds?.join(","))}`);

    const {data, status} = await axios.get<RssItem[]>(requestUrl);

    if (status != 200) console.log("########################## ERRROR")
        
    return data
}

export const postUserComment = async (title: string, link: string, description: string, author: string) => {
    return await axios.post(`${beUrl}/comments`, {
        title,
        link,
        description,
        author,
    });
}

export const getItemById = async (item_id: number) => {
    return await axios.get<RssItem>(`${beUrl}/item-list/${item_id}`);
}