import { time } from "console";
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
        
    const requestUrl = beUrl.concat(`/feed-list?urls=${userFeeds?.join(",")}`);

    const {data, status} = await axios.get<RssChannel[]>(requestUrl);

    if (status != 200) console.log("########################## ERRROR")
    
    return data
}


export const fetchUserArticles = async ():Promise<RssItem[]> => {
    const userFeeds = await fetchUserFeeds();

    const requestUrl = beUrl.concat(`/item-list?urls=${userFeeds?.join(",")}`);

    const {data, status} = await axios.get<RssItem[]>(requestUrl);

    if (status != 200) console.log("########################## ERRROR")
        
    return data
}

export const fetchPaginatedArticles = async (pageNo: number, pageSize: number) => {
    
    const userFeeds = await fetchUserFeeds();
    // ?pageSize=10&pageNo=0&urls=https://www.diepresse.com/rss/Politik&asc=false
    const requestUrl = beUrl.concat(`/item-list/pages?pageSize=${pageSize}&pageNo=${pageNo}&urls=${userFeeds.join(",")}&asc=false`)
    const {data, status} = await axios.get<ItemPageable>(requestUrl);

    if (status != 200) console.log("########################## ERRROR")

    console.log(data);
        
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

export const getUserComments = async (after: string) => {
    const {data, status} = await axios.get<UserComment[]>(`${beUrl}/comments/${after}`);

    if (status != 200) console.log("###################### ERROR")

    return data
}

export const getPaginatedUserComments = async (pageNo: number) => {
    const {data, status} = await axios.get<UserCommentPageable>(`${beUrl}/comments/pages?pageSize=3&pageNo=${pageNo}`);

    if (status != 200) console.log("###################### ERROR")

    return data
}

export const isFeedVaild = async (url: string):Promise<boolean> => {
    axios.post(`${beUrl}/feed-list`, {
        url
    }).then(() => {
        return true
    })
    .catch(() => {
        return false
    })

    return false
}

export const addTheFeedFr = async (url:string) => {
    const {error} = await supabase
        .from("user_feeds")
        .insert({feedUrl: url})

    if (error) alert("OIDA ERROR NA: " + error.message)
}

export const getItemById = async (item_id: number) => {
    return await axios.get<RssItem>(`${beUrl}/item-list/${item_id}`);
}